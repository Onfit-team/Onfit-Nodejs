import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

let isModelReady = false;
let initPromise = null;

// 모델 초기화 (런타임에 다운로드)
const ensureModelReady = async () => {
  if (isModelReady) return;
  if (initPromise) return initPromise;

  initPromise = _downloadModel();
  await initPromise;
  isModelReady = true;
};

const _downloadModel = async () => {
  const modelCheckScript = `
import os
import sys
from pathlib import Path

# 모델 존재 여부 확인
cache_dir = os.getenv('HF_HOME', '/app/.cache/huggingface')
model_path = Path(cache_dir) / 'hub' / 'models--briaai--RMBG-1.4'

if model_path.exists():
    print("Model already exists")
    sys.exit(0)

print("Downloading RMBG model...")
from transformers import pipeline
pipeline('image-segmentation', model='briaai/RMBG-1.4', trust_remote_code=True)
print("Model downloaded successfully")
`;

  return new Promise((resolve) => {
    const py = spawn('python3', ['-c', modelCheckScript]);

    py.stdout.on('data', (data) => {
      console.log('[RMBG]', data.toString().trim());
    });

    py.stderr.on('data', (data) => {
      console.error('[RMBG Error]', data.toString().trim());
    });

    py.on('close', (code) => {
      if (code === 0) {
        console.log('[RMBG] 모델 준비 완료');
      } else {
        console.error('[RMBG] 모델 초기화 실패');
      }
      // 실패해도 서버는 계속 실행
      resolve();
    });
  });
};

// 배경 제거 함수 (Buffer 반환)
export const removeBackground = async (buffer) => {
  await ensureModelReady();

  const inputPath = path.join(os.tmpdir(), `input-${Date.now()}.png`);
  const outputPath = path.join(os.tmpdir(), `output-${Date.now()}.png`);

  await fs.promises.writeFile(inputPath, buffer);

  const pythonScript = `
import sys
from PIL import Image
import numpy as np
import cv2
from transformers import pipeline

input_path = sys.argv[1]
output_path = sys.argv[2]

# Pipeline 로드
pipe = pipeline('image-segmentation', model='briaai/RMBG-1.4', trust_remote_code=True)

# 배경 제거
rgba = pipe(input_path).convert("RGBA")
alpha = np.array(rgba.split()[-1])
blurred = cv2.GaussianBlur(alpha, (11, 11), 0)

np_rgba = np.array(rgba)
np_rgba[..., 3] = blurred
mask = np_rgba[..., 3] < 254
np_rgba[mask] = (0, 0, 0, 0)

Image.fromarray(np_rgba, mode="RGBA").save(output_path)
print("Done")
`;

  return new Promise((resolve, reject) => {
    const tempScript = path.join(os.tmpdir(), `rmbg-${Date.now()}.py`);
    fs.writeFileSync(tempScript, pythonScript);

    const py = spawn('python3', [tempScript, inputPath, outputPath]);

    let stderr = '';
    py.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    py.on('close', async (code) => {
      // 임시 파일 정리
      fs.promises.unlink(tempScript).catch(() => {});
      fs.promises.unlink(inputPath).catch(() => {});

      if (code === 0) {
        try {
          const result = await fs.promises.readFile(outputPath);
          fs.promises.unlink(outputPath).catch(() => {});
          resolve(result); // ✅ 무조건 Buffer 반환
        } catch (err) {
          reject(new Error('결과 파일 읽기 실패'));
        }
      } else {
        console.error('[RMBG] 실행 실패:', stderr);
        resolve(buffer); // 실패 시 원본 반환
      }
    });
  });
};

// 서버 시작 시 백그라운드에서 모델 다운로드
export const initRMBG = () => {
  ensureModelReady().catch(err => {
    console.error('[RMBG] 초기화 실패:', err);
  });
};

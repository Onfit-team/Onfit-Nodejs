// yolov5 실행 예시 (yolo.service.js)
import { spawn } from 'child_process';
import path from 'path';

export async function runYolo(imageBuffer) {
  return new Promise((resolve, reject) => {
    const python = spawn('python', ['predict.py', 'best_v2_full.pt']);

    let stdout = '';
    let stderr = '';

    python.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    python.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    python.on('close', (code) => {
      if (code === 0) {
        resolve(JSON.parse(stdout));
      } else {
        reject(new Error('YOLO 실행 실패: ' + stderr));
      }
    });

    python.stdin.write(imageBuffer);
    python.stdin.end();
  });
}

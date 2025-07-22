import OpenAI from 'openai';
import { itemRepository } from './item.repository.js';
import { v4 as uuidv4 } from 'uuid';
import { spawn } from 'child_process';
import sharp from 'sharp';
import redisClient from '../../utils/redis.js';
import { uploadToS3 } from '../../utils/s3.js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const CATEGORY_MAP = {
  '상의': 0, '하의': 1, '원피스': 2, '아우터': 3, '신발': 4, '액세서리': 5
};

// ✅ 크롭 및 캐싱
export const cropAndCache = async (userId, file) => {
  if (!file || !file.buffer) throw new Error("이미지가 없습니다.");

  const yoloResult = await runYolo(file.buffer);

  const crops = [];
  for (const detection of yoloResult) {
    const cropId = uuidv4();
    let croppedBuffer = await cropImage(file.buffer, detection.bbox);

    // 🖤 배경 제거 (Sharp)
    croppedBuffer = await removeBackground(croppedBuffer);

    // Redis 캐싱 (10분)
    await redisClient.setEx(`crop:${userId}:${cropId}`, 600, croppedBuffer.toString('base64'));
    await redisClient.setEx(`crop:${userId}:${cropId}:category`, 600, `${CATEGORY_MAP[detection.class] ?? 0}`);

    crops.push({ crop_id: cropId, category: detection.class, bbox: detection.bbox });
  }

  return crops;
};

// ✅ 보정 + S3 업로드
export const saveAndTransform = async (userId, cropId, prompt) => {
  const base64Image = await redisClient.get(`crop:${userId}:${cropId}`);
  if (!base64Image) throw new Error("크롭 이미지가 만료되었습니다.");

  const category = parseInt(await redisClient.get(`crop:${userId}:${cropId}:category`)) || 0;

  // 🖌️ DALL·E 인페인팅
  const dalleResponse = await openai.images.edit({
    image: Buffer.from(base64Image, 'base64'),
    mask: null, // 이미 배경 제거됨
    prompt,
    n: 1,
    size: "1024x1024",
    response_format: "b64_json"
  });

  const transformedBuffer = Buffer.from(dalleResponse.data[0].b64_json, 'base64');
  const s3Key = `transformed/${userId}/${cropId}.png`;
  const s3Url = await uploadToS3(transformedBuffer, s3Key);

  // DB 저장
  await itemRepository.create({
    userId,
    image: s3Url,
    category,
    subcategory: 0,
    brand: null,
    color: 0,
    size: null,
    season: 0,
    purchaseDate: null,
    isDeleted: false
  });

  return s3Url;
};

// 🛠 YOLO 실행
const runYolo = (buffer) => {
  return new Promise((resolve, reject) => {
    const pythonPath = process.env.YOLO_PYTHON_PATH || 'python';
    const yolo = spawn(pythonPath, ['predict.py', 'yolo_models/best.pt']);

    let output = '';
    yolo.stdout.on('data', (data) => { output += data.toString(); });
    yolo.stderr.on('data', (data) => { console.error(`stderr: ${data}`); });
    yolo.stdin.write(buffer);
    yolo.stdin.end();

    yolo.on('close', (code) => {
      if (code === 0) {
        try {
          const parsed = JSON.parse(output);
          resolve(parsed);
        } catch (err) {
          console.error("YOLO JSON 파싱 오류:", err, "\nPython 출력:", output);
          reject(new Error("YOLO 결과 파싱 실패"));
        }
      } else {
        reject(new Error("YOLO 실행 오류"));
      }
    });
  });
};

// 🖼️ 이미지 크롭
const cropImage = async (buffer, bbox) => {
  const [x1, y1, x2, y2] = bbox.map(Math.round);
  const width = x2 - x1;
  const height = y2 - y1;

  return sharp(buffer)
    .extract({ left: x1, top: y1, width, height })
    .png()
    .toBuffer();
};

// ✅ 배경 제거
const removeBackground = async (buffer) => {
  return sharp(buffer)
    .flatten({ background: { r: 0, g: 0, b: 0, alpha: 0 } }) // 투명 배경
    .png()
    .toBuffer();
};

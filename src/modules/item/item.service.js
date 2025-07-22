import OpenAI from 'openai';
import { itemRepository } from './item.repository.js';
import { v4 as uuidv4 } from 'uuid';
import { spawn } from 'child_process';
import { CustomError, NotExistsError } from '../../utils/error.js';
import sharp from 'sharp';
import redisClient from '../../utils/redis.js'; // Redis 클라이언트

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const CATEGORY_MAP = {
  '상의': 0,
  '하의': 1,
  '원피스': 2,
  '아우터': 3,
  '신발': 4,
  '액세서리': 5
};

// YOLO 결과 캐시에 저장 (10분 TTL)
export const cropAndCache = async (userId, file) => {
  if (!file || !file.buffer) throw new CustomError("분석할 이미지가 없습니다.", "Y400", 400);

  const yoloResult = await runYolo(file.buffer); // YOLO 실행해서 감지 결과 받음

  const crops = [];
  for (const detection of yoloResult) {
    const cropId = uuidv4();
    const croppedBuffer = await cropImage(file.buffer, detection.bbox);

    // Redis에 크롭 이미지 저장
    await redisClient.setEx(
      `crop:${userId}:${cropId}`,
      600,
      croppedBuffer.toString('base64')
    );

    // Redis에 카테고리 코드도 같이 저장
    const categoryCode = CATEGORY_MAP[detection.class] ?? 0;
    await redisClient.setEx(
      `crop:${userId}:${cropId}:category`,
      600,
      `${categoryCode}`
    );

    crops.push({
      crop_id: cropId,
      category: detection.class,
      bbox: detection.bbox,
    });
  }

  return crops;
};

// 선택된 크롭 저장 + 스타일 변환 (create API 사용)
export const saveAndTransform = async (userId, cropId, prompt) => {
  // Redis에서 크롭 메타데이터 가져오기
  const base64Image = await redisClient.get(`crop:${userId}:${cropId}`);
  if (!base64Image) throw new NotExistsError("선택한 크롭 이미지가 만료되었습니다.");

  // Redis에서 category 메타데이터도 가져오기
  const categoryJson = await redisClient.get(`crop:${userId}:${cropId}:category`);
  const category = categoryJson ? parseInt(categoryJson) : 0;

  // DB에 저장
  await itemRepository.create({
    userId,
    image: null, // 생성된 이미지 경로를 DB에 넣고 싶으면 여기 추가
    category,    // 필수 필드
    subcategory: 0,
    brand: null,
    color: 0,
    size: null,
    season: 0,
    purchaseDate: null,
    isDeleted: false
  });

  // OpenAI create API로 새 이미지 생성
  const dalleResponse = await openai.images.generate({
    prompt: prompt,
    n: 1,
    size: "1024x1024",
    response_format: "b64_json"
  });

  return `data:image/png;base64,${dalleResponse.data[0].b64_json}`;
};

// YOLO 실행
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
          reject(new CustomError("YOLO 결과 파싱 실패", "Y501", 500));
        }
      } else {
        reject(new CustomError("AI 인식에 실패했습니다.", "Y500", 500));
      }
    });
  });
};

// 이미지 크롭
const cropImage = async (buffer, bbox) => {
  const [x1, y1, x2, y2] = bbox.map(Math.round);
  const width = x2 - x1;
  const height = y2 - y1;

  return sharp(buffer)
    .extract({ left: x1, top: y1, width, height })
    .toFormat('png')
    .toBuffer();
};

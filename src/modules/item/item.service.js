import OpenAI from "openai";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import { spawn } from "child_process";
import redisClient from "../../utils/redis.js";
import { uploadToS3 } from "../../utils/s3.js";
import { itemRepository } from "./item.repository.js";
import {
  InvalidInputError,
  NotExistsError,
  CustomError,
} from "../../utils/error.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * 1️⃣ YOLO → Sharp 크롭 → Sharp 배경 제거 → Redis 캐싱
 */
export const detectAndCache = async (userId, file) => {
  const yoloResult = await runYolo(file.buffer);
  if (!yoloResult || yoloResult.length === 0) {
    throw new NotExistsError("감지된 옷이 없습니다.");
  }

  const crops = [];
  for (const detection of yoloResult) {
    const cropId = uuidv4();
    const croppedBuffer = await cropImage(file.buffer, detection.bbox);
    const bgRemovedBuffer = await removeBackground(croppedBuffer);

    // Redis 캐싱 (10분)
    await redisClient.setEx(
      `crop:${userId}:${cropId}`,
      600,
      bgRemovedBuffer.toString("base64")
    );
    crops.push({
      crop_id: cropId,
      category: detection.class,
      bbox: detection.bbox,
    });
  }
  return crops;
};

/**
 * 2️⃣ DALL·E 인페인팅 → Redis 캐싱
 */
export const refineItem = async (userId, cropId, prompt) => {
  const base64Image = await redisClient.get(`crop:${userId}:${cropId}`);
  if (!base64Image) throw new NotExistsError("크롭 이미지가 만료되었습니다.");

  const buffer = Buffer.from(base64Image, "base64");
  const maskBuffer = await generateMask(buffer);

  const dalleResponse = await openai.images.edit({
    image: buffer,
    mask: maskBuffer,
    prompt: prompt,
    n: 1,
    size: "1024x1024",
    response_format: "b64_json",
  });

  const refinedBuffer = Buffer.from(dalleResponse.data[0].b64_json, "base64");
  const refinedId = uuidv4();

  // Redis 캐싱 (10분)
  await redisClient.setEx(
    `refined:${userId}:${refinedId}`,
    600,
    refinedBuffer.toString("base64")
  );

  return { refined_id: refinedId };
};

/**
 * 3️⃣ S3 업로드 + DB 저장
 */
export const saveItem = async (userId, refinedId) => {
  const base64Image = await redisClient.get(`refined:${userId}:${refinedId}`);
  if (!base64Image) throw new NotExistsError("리파인 이미지가 만료되었습니다.");

  const buffer = Buffer.from(base64Image, "base64");
  const s3Key = `final/${userId}/${refinedId}.png`;
  const s3Url = await uploadToS3(buffer, s3Key);

  const savedItem = await itemRepository.create({
    userId,
    image: s3Url,
    category: 0, // 카테고리 값은 필요시 전달받아 수정
    subcategory: 0,
    brand: null,
    color: 0,
    size: null,
    season: 0,
    purchaseDate: null,
    isDeleted: false,
  });

  return { id: savedItem.id, image_url: s3Url };
};

// 🖤 YOLO 실행
const runYolo = (buffer) => {
  return new Promise((resolve, reject) => {
    const pythonPath = process.env.YOLO_PYTHON_PATH || "python";
    const yolo = spawn(pythonPath, ["predict.py", "yolo_models/best.pt"]);

    let output = "";
    yolo.stdout.on("data", (data) => {
      output += data.toString();
    });
    yolo.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });
    yolo.stdin.write(buffer);
    yolo.stdin.end();

    yolo.on("close", (code) => {
      if (code === 0) {
        try {
          const parsed = JSON.parse(output);
          resolve(parsed);
        } catch (err) {
          reject(
            new CustomError("YOLO 결과 파싱 실패", "YOLO_PARSE_ERROR", 500)
          );
        }
      } else {
        reject(new CustomError("YOLO 실행 오류", "YOLO_ERROR", 500));
      }
    });
  });
};

// 🖤 Sharp 크롭
const cropImage = async (buffer, bbox) => {
  const [x1, y1, x2, y2] = bbox.map(Math.round);
  const width = x2 - x1;
  const height = y2 - y1;

  return sharp(buffer)
    .extract({ left: x1, top: y1, width, height })
    .png()
    .toBuffer();
};

// 🖤 배경 제거
const removeBackground = async (buffer) => {
  return sharp(buffer)
    .removeAlpha() // 알파 채널 제거
    .threshold(240) // 흰 배경 단순 제거
    .png()
    .toBuffer();
};

// 🖤 DALL·E 마스크용 흑백 이미지 생성
const generateMask = async (buffer) => {
  return sharp(buffer)
    .ensureAlpha()
    .threshold(10)
    .toColourspace("b-w")
    .png()
    .toBuffer();
};

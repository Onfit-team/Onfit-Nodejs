// 📂 src/modules/item/item.service.js

import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import redisClient from "../../utils/redis.js";
import { uploadToS3 } from "../../utils/s3.js";
import { runYolo } from "../../utils/yolo.js";
import { InvalidInputError, NotExistsError } from "../../utils/error.js";
import { removeBackground, initOnnx } from "../../utils/rmbg.js";
import OpenAI from "openai";

const ONE_DAY = 86400;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 서버 시작 시 ONNX 모델 미리 로드
(async () => {
  try {
    console.log("[RMBG] 초기화 시작");
    await initOnnx();
    console.log("[RMBG] 초기화 완료");
  } catch (err) {
    console.error("[RMBG] 초기화 실패:", err);
  }
})();

/** 1. detect */
export async function detectAndCache(userId, file) {
  if (!file?.buffer) throw new InvalidInputError("이미지 파일이 필요합니다.");

  const detections = await runYolo(file.buffer);
  if (!detections.length) throw new InvalidInputError("의류를 감지하지 못했습니다.");

  const crops = [];
  for (const det of detections) {
    const cropId = uuidv4();
    const cropBuffer = await sharp(file.buffer)
      .extract({
        left: Math.floor(det.bbox[0]),
        top: Math.floor(det.bbox[1]),
        width: Math.floor(det.bbox[2] - det.bbox[0]),
        height: Math.floor(det.bbox[3] - det.bbox[1]),
      })
      .toBuffer();

    await redisClient.setEx(`crop:${userId}:${cropId}`, ONE_DAY, cropBuffer.toString("base64"));
    crops.push({ crop_id: cropId, category: det.label, bbox: det.bbox });
  }
  return crops;
}

/** 2. refine (RMBG + DALL·E) */
export const refineFromCrop = async (userId, cropId) => {
  console.log(`[Refine] cropId=${cropId} 시작`);

  const base64 = await redisClient.get(`crop:${userId}:${cropId}`);
  if (!base64) throw new NotExistsError("크롭 이미지를 찾을 수 없습니다.");
  const cropBuffer = Buffer.from(base64, "base64");

  // 2-1) RMBG 배경제거
  console.log("[Refine] RMBG 배경제거 시작");
  const rmbgPng = await removeBackground(cropBuffer);
  console.log("[Refine] RMBG 배경제거 완료");

  // 2-2) DALL·E 프롬프트
  const prompt =
    "High-quality clothing photo on a clean white background, shopping mall style, preserve original colors and fabric details, no person, no mannequin";

  // 2-3) OpenAI API 호출
  console.log("[Refine] OpenAI DALL·E 호출 시작");
  let refinedBuffer;
  try {
    const dalleResult = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
      // gpt-image-1의 경우 image 업로드는 base64 string 형태로 전달
      image: [{ name: "input.png", buffer: rmbgPng }],
    });

    const imageBase64 = dalleResult.data[0].b64_json;
    refinedBuffer = Buffer.from(imageBase64, "base64");
    console.log("[Refine] OpenAI DALL·E 호출 완료");
  } catch (err) {
    console.error("[Refine] OpenAI 호출 실패:", err);
    throw new Error("이미지 리파인 실패");
  }

  // 2-4) Redis 저장
  const refinedId = uuidv4();
  await redisClient.setEx(`refined:${userId}:${refinedId}`, ONE_DAY, refinedBuffer.toString("base64"));

  // 2-5) S3 업로드 (비동기)
  uploadToS3(refinedBuffer, `final/${userId}/${refinedId}.png`).catch(console.error);

  console.log(`[Refine] 완료 → refinedId=${refinedId}`);
  return { refined_id: refinedId };
};

/** 3. save */
export const saveItem = async (userId, refinedId) => {
  const base64 = await redisClient.get(`refined:${userId}:${refinedId}`);
  if (!base64) throw new NotExistsError("리파인 이미지를 찾을 수 없습니다.");

  const buffer = Buffer.from(base64, "base64");
  const s3Key = `final/${userId}/${refinedId}.png`;
  const imageUrl = await uploadToS3(buffer, s3Key);

  const item = await itemRepository.create({
    userId,
    image: imageUrl,
    category: 0,
    subcategory: 0,
    brand: null,
    color: 0,
    size: null,
    season: 0,
    purchaseDate: null,
    isDeleted: false,
  });

  return { id: item.id, image_url: imageUrl };
};

/** 4. delete crop */
export const deleteCropImage = async (userId, cropId) => {
  const deleted = await redisClient.del(`crop:${userId}:${cropId}`);
  if (!deleted) throw new NotExistsError("삭제할 크롭 이미지를 찾을 수 없습니다.");
  return { deleted: true };
};

/** 5. 단순 업로드 */
export const uploadImage = async (userId, file) => {
  if (!file?.buffer) throw new InvalidInputError("이미지 파일이 필요합니다.");

  const processedImage = await sharp(file.buffer)
    .resize(1024, 1024, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 90 })
    .toBuffer();

  const imageId = uuidv4();
  const s3Key = `uploads/${userId}/${imageId}.jpg`;
  const imageUrl = await uploadToS3(processedImage, s3Key);

  return { id: imageId, image_url: imageUrl, message: "이미지 업로드 성공" };
};

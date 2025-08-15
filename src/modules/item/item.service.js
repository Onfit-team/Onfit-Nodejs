// 📂 src/modules/item/item.service.js

import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import redisClient from "../../utils/redis.js";
import { uploadToS3 } from "../../utils/s3.js";
import { runYolo } from "../../utils/yolo.js";
import { InvalidInputError, NotExistsError } from "../../utils/error.js";
import { removeBackground} from "../../utils/rmbg.js";
import OpenAI from "openai";

const ONE_DAY = 86400;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

/** 2. refine (RMBG + 이미지 후처리) */
export const refineFromCrop = async (userId, cropId) => {
  console.log(`[Refine] cropId=${cropId} 시작`);

  const base64 = await redisClient.get(`crop:${userId}:${cropId}`);
  if (!base64) throw new NotExistsError("크롭 이미지를 찾을 수 없습니다.");
  const cropBuffer = Buffer.from(base64, "base64");

  // 2-1) RMBG 배경제거
  console.log("[Refine] RMBG 배경제거 시작");
  const rmbgPng = await removeBackground(cropBuffer);
  console.log("[Refine] RMBG 배경제거 완료");

  // 2-2) Sharp를 이용한 이미지 후처리 (DALL-E 대신)
  console.log("[Refine] 이미지 후처리 시작");
  let refinedBuffer;
  try {
    // 흰 배경으로 합성하고 품질 개선
    refinedBuffer = await sharp(rmbgPng)
      .flatten({ background: { r: 255, g: 255, b: 255 } }) // 흰 배경 합성
      .resize(1024, 1024, { 
        fit: 'contain', 
        background: { r: 255, g: 255, b: 255, alpha: 1 } 
      })
      .sharpen() // 선명도 증가
      .modulate({
        brightness: 1.1,  // 약간 밝게
        saturation: 1.2,  // 채도 증가
        hue: 0
      })
      .png({ quality: 95 })
      .toBuffer();
    
    console.log("[Refine] 이미지 후처리 완료");
  } catch (err) {
    console.error("[Refine] 이미지 후처리 실패:", err);
    // 실패시 RMBG 결과 그대로 사용
    refinedBuffer = rmbgPng;
  }

  // 2-3) Redis 저장
  const refinedId = uuidv4();
  await redisClient.setEx(`refined:${userId}:${refinedId}`, ONE_DAY, refinedBuffer.toString("base64"));

  // 2-4) S3 업로드 (비동기)
  uploadToS3(refinedBuffer, `final/${userId}/${refinedId}.png`).catch(console.error);

  console.log(`[Refine] 완료 → refinedId=${refinedId}`);
  return { refined_id: refinedId };
};

/** 2-B. OpenAI Vision API를 사용한 대안 (선택사항) */
export const refineFromCropWithAI = async (userId, cropId) => {
  console.log(`[Refine AI] cropId=${cropId} 시작`);

  const base64 = await redisClient.get(`crop:${userId}:${cropId}`);
  if (!base64) throw new NotExistsError("크롭 이미지를 찾을 수 없습니다.");
  const cropBuffer = Buffer.from(base64, "base64");

  // RMBG 배경제거
  console.log("[Refine AI] RMBG 배경제거 시작");
  const rmbgPng = await removeBackground(cropBuffer);
  console.log("[Refine AI] RMBG 배경제거 완료");

  try {
    // OpenAI Vision API로 이미지 분석
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "이 의류 이미지를 분석하고 색상, 스타일, 재질을 간단히 설명해주세요."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/png;base64,${rmbgPng.toString('base64')}`
              }
            }
          ]
        }
      ],
      max_tokens: 300
    });

    const description = response.choices[0].message.content;
    console.log("[Refine AI] AI 분석 결과:", description);

    // 이미지 후처리
    const refinedBuffer = await sharp(rmbgPng)
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .resize(1024, 1024, { 
        fit: 'contain', 
        background: { r: 255, g: 255, b: 255, alpha: 1 } 
      })
      .sharpen()
      .modulate({
        brightness: 1.1,
        saturation: 1.2,
        hue: 0
      })
      .png({ quality: 95 })
      .toBuffer();

    const refinedId = uuidv4();
    await redisClient.setEx(`refined:${userId}:${refinedId}`, ONE_DAY, refinedBuffer.toString("base64"));
    await redisClient.setEx(`description:${userId}:${refinedId}`, ONE_DAY, description);

    uploadToS3(refinedBuffer, `final/${userId}/${refinedId}.png`).catch(console.error);

    return { refined_id: refinedId, description };

  } catch (err) {
    console.error("[Refine AI] OpenAI 호출 실패:", err);
    // 실패시 기본 후처리로 폴백
    return refineFromCrop(userId, cropId);
  }
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
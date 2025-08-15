// 📂 src/modules/item/item.service.js

import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import redisClient from "../../utils/redis.js";
import { uploadToS3 } from "../../utils/s3.js";
import { runYolo } from "../../utils/yolo.js";
import { InvalidInputError, NotExistsError } from "../../utils/error.js";
import { removeBackground} from "../../utils/rmbg.js";
import OpenAI from "openai";
import { itemRepository } from "./item.repository.js"; // 같은 폴더에서 import

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

/** 2. refine (RMBG + DALL-E 쇼핑몰 스타일 재생성) */
export const refineFromCrop = async (userId, cropId) => {
  console.log(`[Refine] cropId=${cropId} 시작`);

  const base64 = await redisClient.get(`crop:${userId}:${cropId}`);
  if (!base64) throw new NotExistsError("크롭 이미지를 찾을 수 없습니다.");
  const cropBuffer = Buffer.from(base64, "base64");

  try {
    // 2-1) RMBG 배경제거로 의류만 추출
    console.log("[Refine] RMBG 배경제거 시작");
    const rmbgPng = await removeBackground(cropBuffer);
    console.log("[Refine] RMBG 배경제거 완료");

    // 2-2) 배경제거된 이미지를 1024x1024로 리사이즈 (DALL-E 입력용)
    const resizedForDalle = await sharp(rmbgPng)
      .resize(1024, 1024, { 
        fit: 'contain', 
        background: { r: 255, g: 255, b: 255, alpha: 0 } // 투명 배경 유지
      })
      .png()
      .toBuffer();

    // 2-3) OpenAI DALL-E Edit API로 쇼핑몰 스타일 이미지 생성
    console.log("[Refine] DALL-E 이미지 편집 시작");
    
    // 마스크 생성: 투명한 부분(배경)을 흰색으로, 옷 부분을 검은색으로
    const maskBuffer = await sharp(resizedForDalle)
      .extractChannel('alpha') // 알파 채널 추출
      .threshold(1) // 1 이상은 흰색(255), 0은 검은색(0)으로 변환
      .negate() // 반전: 투명부분(배경)은 흰색, 옷부분은 검은색
      .toBuffer();

    // DALL-E Edit 요청
    const dalleResponse = await openai.images.edit({
      model: "dall-e-2",
      image: resizedForDalle, // 원본 이미지 (의류가 있는)
      mask: maskBuffer, // 마스크 (편집할 영역 = 배경)
      prompt: "Professional product photography of clothing item on clean white background, studio lighting, high quality, commercial fashion photography style, centered composition",
      n: 1,
      size: "1024x1024",
      response_format: "b64_json"
    });

    console.log("[Refine] DALL-E 이미지 편집 완료");

    // 2-4) DALL-E 결과 처리
    const dalleImageB64 = dalleResponse.data[0].b64_json;
    const dalleBuffer = Buffer.from(dalleImageB64, 'base64');

    // 2-5) 최종 후처리 (선명도, 대비 향상)
    const refinedBuffer = await sharp(dalleBuffer)
      .sharpen({ sigma: 1.2, flat: 1, jagged: 2 }) // 선명도 강화
      .modulate({
        brightness: 1.05,  // 약간 밝게
        saturation: 1.1,   // 채도 약간 증가
        hue: 0
      })
      .png({ quality: 95, compressionLevel: 6 })
      .toBuffer();

    // 2-6) Redis 저장
    const refinedId = uuidv4();
    await redisClient.setEx(`refined:${userId}:${refinedId}`, ONE_DAY, refinedBuffer.toString("base64"));

    // 2-7) S3 업로드 (비동기)
    uploadToS3(refinedBuffer, `final/${userId}/${refinedId}.png`).catch(console.error);

    console.log(`[Refine] 완료 → refinedId=${refinedId}`);
    return { refined_id: refinedId };

  } catch (error) {
    console.error("[Refine] DALL-E 편집 실패:", error);
    
    // 폴백: DALL-E 실패시 기본 후처리 사용
    console.log("[Refine] 폴백: 기본 후처리 실행");
    const rmbgPng = await removeBackground(cropBuffer);
    
    const fallbackBuffer = await sharp(rmbgPng)
      .flatten({ background: { r: 255, g: 255, b: 255 } }) // 흰 배경 합성
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
    await redisClient.setEx(`refined:${userId}:${refinedId}`, ONE_DAY, fallbackBuffer.toString("base64"));
    uploadToS3(fallbackBuffer, `final/${userId}/${refinedId}.png`).catch(console.error);

    return { refined_id: refinedId };
  }
};

/** 2-B. 향상된 AI 분석 버전 */
export const refineFromCropWithAI = async (userId, cropId) => {
  console.log(`[Refine AI] cropId=${cropId} 시작`);

  const base64 = await redisClient.get(`crop:${userId}:${cropId}`);
  if (!base64) throw new NotExistsError("크롭 이미지를 찾을 수 없습니다.");
  const cropBuffer = Buffer.from(base64, "base64");

  try {
    // RMBG 배경제거
    const rmbgPng = await removeBackground(cropBuffer);

    // GPT-4V로 의류 분석
    const analysisResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this clothing item and provide details about: style, color, material type, and category (shirt/dress/pants/etc). Respond in Korean."
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
      max_tokens: 200
    });

    const description = analysisResponse.choices[0].message.content;
    console.log("[Refine AI] 의류 분석:", description);

    // 분석 결과를 바탕으로 더 구체적인 프롬프트 생성
    const enhancedPrompt = `Professional e-commerce product photography of ${description}, clean white background, studio lighting, high resolution, centered composition, fashion photography style, no shadows, commercial quality`;

    // 리사이즈
    const resizedForDalle = await sharp(rmbgPng)
      .resize(1024, 1024, { 
        fit: 'contain', 
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toBuffer();

    // 마스크 생성
    const maskBuffer = await sharp(resizedForDalle)
      .extractChannel('alpha')
      .threshold(1)
      .negate()
      .toBuffer();

    // DALL-E Edit
    const dalleResponse = await openai.images.edit({
      model: "dall-e-2",
      image: resizedForDalle,
      mask: maskBuffer,
      prompt: enhancedPrompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json"
    });

    const dalleBuffer = Buffer.from(dalleResponse.data[0].b64_json, 'base64');

    // 최종 후처리
    const refinedBuffer = await sharp(dalleBuffer)
      .sharpen({ sigma: 1.2, flat: 1, jagged: 2 })
      .modulate({
        brightness: 1.05,
        saturation: 1.1,
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
    console.error("[Refine AI] 실패:", err);
    // 기본 refine으로 폴백
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
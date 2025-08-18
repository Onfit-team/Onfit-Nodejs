import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import redisClient from "../../utils/redis.js";
import { uploadToS3 } from "../../utils/s3.js";
import { runYolo } from "../../utils/yolo.js";
import { InvalidInputError, NotExistsError } from "../../utils/error.js";
import { removeBackground } from "../../utils/rmbg.js";
import OpenAI from "openai";
import { itemRepository } from "./item.repository.js";
import { toFile } from "openai/uploads";

const ONE_DAY = 86400;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/** 1. detect - YOLO 감지 후 crop + bbox + original 저장 */
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

    // Redis 저장
    await redisClient.setEx(`crop:${userId}:${cropId}`, ONE_DAY, cropBuffer.toString("base64"));
    await redisClient.setEx(`bbox:${userId}:${cropId}`, ONE_DAY, JSON.stringify(det.bbox));
    await redisClient.setEx(`original:${userId}:${cropId}`, ONE_DAY, file.buffer.toString("base64"));

    crops.push({ crop_id: cropId, category: det.label, bbox: det.bbox });
  }
  return crops;
}

/** 2. refine - RMBG + DALL·E 보정 */
export const refineFromCrop = async (userId, cropId, promptOverride = null) => {
  console.log(`[Refine] cropId=${cropId} 시작`);

  const base64 = await redisClient.get(`crop:${userId}:${cropId}`);
  if (!base64) throw new NotExistsError("크롭 이미지를 찾을 수 없습니다.");
  const cropBuffer = Buffer.from(base64, "base64");

  const originalB64 = await redisClient.get(`original:${userId}:${cropId}`);
  const bboxData = await redisClient.get(`bbox:${userId}:${cropId}`);

  const originalImageBuffer = originalB64 ? Buffer.from(originalB64, "base64") : null;
  const bbox = bboxData ? JSON.parse(bboxData) : null;

  try {
    // 1) 배경 제거
    console.log("[Refine] RMBG 실행");
    const clothingMask = await removeBackground(cropBuffer);

    // 2) 마스크 추출
    const binaryMask = await sharp(clothingMask)
      .extractChannel("alpha")
      .threshold(10)
      .toBuffer();

    let clothingOnly;
    if (bbox && originalImageBuffer) {
      const originalCrop = await sharp(originalImageBuffer)
        .extract({
          left: Math.floor(bbox[0]),
          top: Math.floor(bbox[1]),
          width: Math.floor(bbox[2] - bbox[0]),
          height: Math.floor(bbox[3] - bbox[1]),
        })
        .toBuffer();

      clothingOnly = await sharp(originalCrop)
        .composite([{ input: binaryMask, blend: "dest-in" }])
        .png()
        .toBuffer();
    } else {
      clothingOnly = clothingMask;
    }

    // 3) DALL·E 입력용 사이즈 조정
    const resizedForDalle = await sharp(clothingOnly)
      .resize(1024, 1024, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toBuffer();

    const editMask = await sharp(resizedForDalle)
      .extractChannel("alpha")
      .threshold(1)
      .negate()
      .png()
      .toBuffer();

    const imageFile = await toFile(resizedForDalle, "image.png", { type: "image/png" });
    const maskFile = await toFile(editMask, "mask.png", { type: "image/png" });

    console.log("[Refine] DALL·E 호출 시작");

    const dalleResponse = await openai.images.edit({
      model: "dall-e-2",
      image: imageFile,
      mask: maskFile,
      prompt: promptOverride ||
        "Professional e-commerce product photography, clean white background, soft studio lighting, centered composition, no people, premium quality",
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const dalleBuffer = Buffer.from(dalleResponse.data[0].b64_json, "base64");

    // 4) 후처리 + 저장
    const refinedBuffer = await sharp(dalleBuffer)
      .sharpen()
      .modulate({ brightness: 1.02, saturation: 1.08 })
      .png({ quality: 95 })
      .toBuffer();

    const refinedId = uuidv4();
    await redisClient.setEx(`refined:${userId}:${refinedId}`, ONE_DAY, refinedBuffer.toString("base64"));
    uploadToS3(refinedBuffer, `final/${userId}/${refinedId}.png`).catch(console.error);

    console.log(`[Refine] 완료 → refinedId=${refinedId}`);
    return { refined_id: refinedId };
  } catch (error) {
    console.error("[Refine] 실패:", error.message);
    return fallbackRefine(userId, cropId, cropBuffer);
  }
};

/** 2-B. 폴백 모드 */
async function fallbackRefine(userId, cropId, cropBuffer) {
  console.log("[Refine] 폴백 실행");
  const rmbgResult = await removeBackground(cropBuffer);

  const fallbackBuffer = await sharp(rmbgResult)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .resize(1024, 1024, { fit: "contain" })
    .png({ quality: 90 })
    .toBuffer();

  const refinedId = uuidv4();
  await redisClient.setEx(`refined:${userId}:${refinedId}`, ONE_DAY, fallbackBuffer.toString("base64"));
  uploadToS3(fallbackBuffer, `final/${userId}/${refinedId}.png`).catch(console.error);

  return { refined_id: refinedId };
}

/** 3. save - 최종 S3 업로드 + DB 저장 */
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

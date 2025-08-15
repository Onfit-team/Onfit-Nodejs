import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import redisClient from "../../utils/redis.js";
import { uploadToS3 } from "../../utils/s3.js";
import { runYolo } from "../../utils/yolo.js";
import { InvalidInputError, NotExistsError } from "../../utils/error.js";
import { removeBackground } from "../../utils/rmbg.js"; // 변경됨
import OpenAI from "openai";

const ONE_DAY = 86400;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 1. YOLO 감지 & 크롭 저장
export async function detectAndCache(userId, file) {
  if (!file?.buffer) throw new InvalidInputError("이미지 파일이 필요합니다.");

  const detections = await runYolo(file.buffer);
  if (!detections.length) throw new InvalidInputError("의류를 감지하지 못했습니다.");

  const crops = await Promise.all(
    detections.map(async det => {
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
      return { crop_id: cropId, category: det.label, bbox: det.bbox };
    })
  );

  return crops;
}

// 2. Refine (배경제거 + DALL·E)
export const refineFromCrop = async (userId, cropId) => {
  const base64 = await redisClient.get(`crop:${userId}:${cropId}`);
  if (!base64) throw new NotExistsError("크롭 이미지를 찾을 수 없습니다.");
  
  console.log(`[Refine] cropId=${cropId} 시작`);

  const cropBuffer = Buffer.from(base64, "base64");

  // rmbg-api로 배경제거
  const rmbgPng = await removeBackground(cropBuffer);

  const prompt =
    "High-quality clothing photo on a clean white background, shopping mall style, preserve original colors and fabric details, no person, no mannequin";

  let refinedBuffer;
  try {
    const dalleResult = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
      image: [{ name: "input.png", buffer: rmbgPng }],
    });
    refinedBuffer = Buffer.from(dalleResult.data[0].b64_json, "base64");
  } catch (err) {
    console.error("[Refine] OpenAI 호출 실패:", err);
    throw new Error("이미지 리파인 실패");
  }

  const refinedId = uuidv4();
  await redisClient.setEx(`refined:${userId}:${refinedId}`, ONE_DAY, refinedBuffer.toString("base64"));
  uploadToS3(refinedBuffer, `final/${userId}/${refinedId}.png`).catch(console.error);

  return { refined_id: refinedId };
};

// 3. Save
export const saveItem = async (userId, refinedId) => {
  const base64 = await redisClient.get(`refined:${userId}:${refinedId}`);
  if (!base64) throw new NotExistsError("리파인 이미지를 찾을 수 없습니다.");

  const buffer = Buffer.from(base64, "base64");
  const imageUrl = await uploadToS3(buffer, `final/${userId}/${refinedId}.png`);

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

import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import os from "os";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import redisClient from "../../utils/redis.js";
import { itemRepository } from "./item.repository.js";
import { uploadToS3 } from "../../utils/s3.js";
import { InvalidInputError, NotExistsError } from "../../utils/error.js";
import { runPython } from "../../utils/python.js";
import { spawn } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TMP_DIR = os.tmpdir();
const ONE_DAY = 86400;

// =============== 1) YOLO 감지 후 크롭 저장 ===============
export const detectAndCache = async (userId, file) => {
  if (!file?.buffer) {
    throw new InvalidInputError("이미지 파일이 필요합니다.");
  }

  const tempPath = path.join(TMP_DIR, `input-${uuidv4()}.png`);
  fs.writeFileSync(tempPath, file.buffer);

  let raw;
  try {
    raw = await runPython(
      path.join(__dirname, "yolo", "predict_v8.py"),
      [
        path.join(__dirname, "yolo", "yolo_models", "best.pt"),
        tempPath
      ]
    );
  } catch (err) {
    console.error("YOLO 실행 실패:", err);
    throw new Error("YOLO 실행 실패: " + err.message);
  }

  let results;
  try {
    const match = raw.match(/\[[\s\S]*\]$/m);
    const jsonText = match ? match[0] : raw.trim();
    results = JSON.parse(jsonText || "[]");
  } catch (err) {
    console.error("YOLO JSON 파싱 실패 원본:", raw);
    throw new Error("YOLO JSON 파싱 실패: " + err.message);
  }

  if (!results.length) {
    throw new NotExistsError("감지된 객체 없음");
  }

  const crops = [];
  const { width: imgW, height: imgH } = await sharp(file.buffer).metadata();

  for (const { class: label, bbox } of results) {
    let [x1, y1, x2, y2] = bbox.map(Number);
    const PAD = 10;
    x1 = Math.max(0, Math.floor(x1 - PAD));
    y1 = Math.max(0, Math.floor(y1 - PAD));
    x2 = Math.min(imgW, Math.ceil(x2 + PAD));
    y2 = Math.min(imgH, Math.ceil(y2 + PAD));

    const width = x2 - x1;
    const height = y2 - y1;
    if (width <= 0 || height <= 0) continue;

    const cropId = uuidv4();
    const cropped = await sharp(file.buffer)
      .extract({ left: x1, top: y1, width, height })
      .png()
      .toBuffer();

    const padded = await sharp(cropped)
      .resize(768, 768, { fit: "contain", background: "#ffffff" })
      .flatten({ background: "#ffffff" })
      .png()
      .toBuffer();

    await redisClient.setEx(`crop:${userId}:${cropId}`, ONE_DAY, padded.toString("base64"));
    crops.push({ crop_id: cropId, category: label, bbox });
  }

  try { fs.unlinkSync(tempPath); } catch {}
  return crops;
};

// =============== 2) 배경제거 + 리파인 ===============
export const refineItem = async (userId, cropId) => {
  const base64 = await redisClient.get(`crop:${userId}:${cropId}`);
  if (!base64) throw new NotExistsError("크롭 이미지가 만료되었습니다.");

  const inputBuffer = Buffer.from(base64, "base64");
  const inputPath = path.join(TMP_DIR, `input-${uuidv4()}.png`);
  const outputPath = path.join(TMP_DIR, `output-${uuidv4()}.png`);
  fs.writeFileSync(inputPath, inputBuffer);

  return new Promise((resolve, reject) => {
    const py = spawn("python3", [
      path.resolve("src/modules/item/rmbg/remove_bg.py"),
      inputPath,
      outputPath
    ]);

    py.stderr.on("data", (data) => reject(data.toString()));
    py.on("close", async (code) => {
      try { fs.unlinkSync(inputPath); } catch {}

      if (code === 0) {
        const refinedBuffer = fs.readFileSync(outputPath);
        try { fs.unlinkSync(outputPath); } catch {}

        const refinedId = uuidv4();
        await redisClient.setEx(
          `refined:${userId}:${refinedId}`,
          ONE_DAY,
          refinedBuffer.toString("base64")
        );
        resolve({ refined_id: refinedId });
      } else {
        reject(new Error("배경제거 실패"));
      }
    });
  });
};

// =============== 3) 최종 저장: S3 업로드 + DB 등록 ===============
export const saveItem = async (userId, refinedId) => {
  const base64 = await redisClient.get(`refined:${userId}:${refinedId}`);
  if (!base64) throw new NotExistsError("리파인 이미지가 만료되었습니다.");

  const buffer = Buffer.from(base64, "base64");
  const key = `final/${userId}/${refinedId}.png`;
  const url = await uploadToS3(buffer, key);

  const item = await itemRepository.create({
    userId,
    image: url,
    category: 0,
    subcategory: 0,
    brand: null,
    color: 0,
    size: null,
    season: 0,
    purchaseDate: null,
    isDeleted: false,
  });

  return { id: item.id, image_url: url };
};

// =============== 4) 크롭 삭제 ===============
export const deleteCropImage = async (userId, cropId) => {
  const exists = await redisClient.get(`crop:${userId}:${cropId}`);
  if (!exists) throw new NotExistsError("해당 크롭 이미지가 없습니다.");

  await redisClient.del(`crop:${userId}:${cropId}`);
  return { crop_id: cropId };
};

// 이미지 업로드
export const uploadImage = async (userId, file) => {
  if (!file?.buffer) throw new InvalidInputError("이미지 파일이 필요합니다.");
  
  try {
    // 이미지 리사이징 (선택적)
    const processedImage = await sharp(file.buffer)
      .resize(1024, 1024, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 90 })
      .toBuffer();

    // S3에 업로드
    const imageId = uuidv4();
    const s3Key = `uploads/${userId}/${imageId}.jpg`;
    const imageUrl = await uploadToS3(processedImage, s3Key);

    return { 
      id: imageId,
      image_url: imageUrl,
      message: "이미지 업로드 성공"
    };
  } catch (error) {
    throw new Error("이미지 업로드 실패: " + error.message);
  }
};
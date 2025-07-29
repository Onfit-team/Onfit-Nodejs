import sharp from "sharp";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import os from "os";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import FormData from "form-data";
import redisClient from "../../utils/redis.js";
import { itemRepository } from "./item.repository.js";
import { uploadToS3 } from "../../utils/s3.js";
import { InvalidInputError, NotExistsError } from "../../utils/error.js";
import { runYolo } from "./yolo.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 1. YOLO로 감지 후 크롭 저장
export const detectAndCache = async (userId, file) => {
  if (!file || !file.buffer) throw new InvalidInputError("이미지 파일이 필요합니다.");

  const results = await runYolo(file.buffer);
  if (!results.length) throw new NotExistsError("감지된 객체 없음");

  const crops = [];

  for (const { class: label, bbox } of results) {
    let [x1, y1, x2, y2] = bbox.map(Math.round);
    const pad = 10;
    x1 += pad;
    y1 += pad;
    x2 -= pad;
    y2 -= pad;

    const cropId = uuidv4();

    const cropped = await sharp(file.buffer)
      .extract({ left: x1, top: y1, width: x2 - x1, height: y2 - y1 })
      .toFormat("png")
      .toBuffer();

    const padded = await sharp(cropped)
      .resize(768, 768, { fit: "contain", background: "#ffffff" })
      .flatten({ background: "#ffffff" })
      .png()
      .toBuffer();

    await redisClient.setEx(`crop:${userId}:${cropId}`, 86400, padded.toString("base64"));
    crops.push({ crop_id: cropId, category: label, bbox });
  }

  return crops;
};

// 2. 리파인 (배경 제거 + DALL·E)
export const refineItem = async (userId, cropId) => {
  const base64 = await redisClient.get(`crop:${userId}:${cropId}`);
  if (!base64) throw new NotExistsError("크롭 이미지가 만료되었습니다.");
  const inputBuffer = Buffer.from(base64, "base64");

  const tempDir = os.tmpdir();
  const inputPath = path.join(tempDir, `input-${uuidv4()}.png`);
  const bgRemovedPath = path.join(tempDir, `removed-${uuidv4()}.png`);

  await sharp(inputBuffer)
    .resize(768, 768, { fit: "contain", background: "#ffffff" })
    .flatten({ background: "#ffffff" })
    .png()
    .toFile(inputPath);

  await runPython(path.join(__dirname, "remove_bg.py"), [inputPath, bgRemovedPath]);
  const bgRemovedBuffer = fs.readFileSync(bgRemovedPath);

  const image = await sharp(bgRemovedBuffer)
    .resize(1024, 1024, { fit: "contain", background: "#f0f0f0" })
    .flatten({ background: "#f0f0f0" })
    .png()
    .toBuffer();

  const mask = await sharp(bgRemovedBuffer)
    .resize(1024, 1024, { fit: "contain", background: "#00000000" })
    .threshold(1)
    .removeAlpha()
    .ensureAlpha()
    .png()
    .toBuffer();

  const form = new FormData();
  form.append("image", image, { filename: "image.png" });
  form.append("mask", mask, { filename: "mask.png" });
  form.append("prompt", "Keep only the clothing item on a clean white or gray background. Retouch it cleanly, preserve color and texture.");
  form.append("n", 1);
  form.append("size", "1024x1024");
  form.append("response_format", "b64_json");

  const openaiRes = await axios.post("https://api.openai.com/v1/images/edits", form, {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY1}`,
      ...form.getHeaders()
    },
    maxBodyLength: Infinity
  });

  const refinedId = uuidv4();
  const refinedBuffer = Buffer.from(openaiRes.data.data[0].b64_json, "base64");
  await redisClient.setEx(`refined:${userId}:${refinedId}`, 86400, refinedBuffer.toString("base64"));

  return { refined_id: refinedId };
};

// 3. 최종 저장
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
    isDeleted: false
  });

  return { id: item.id, image_url: url };
};

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
import { runPython } from "../../utils/python.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ 감지 및 캐시
export const detectAndCache = async (userId, file) => {
  if (!file?.buffer) throw new InvalidInputError("이미지 파일이 필요합니다.");
  const tempPath = path.join(os.tmpdir(), `input-${uuidv4()}.png`);
  fs.writeFileSync(tempPath, file.buffer);

  try {
    const raw = await runPython(path.join(__dirname, "predict_v8.py"), [
      path.join(__dirname, "yolo_models", "best.pt"),
      tempPath,
    ]);

    const jsonLine = raw.trim().split("\n").find((line) => line.startsWith("["));
    const results = JSON.parse(jsonLine);
    if (!results.length) throw new NotExistsError("감지된 객체가 없습니다.");

    const crops = [];

    for (const { class: label, bbox } of results) {
      let [x1, y1, x2, y2] = bbox.map(Math.round);
      const pad = 10;
      x1 = Math.max(x1 + pad, 0);
      y1 = Math.max(y1 + pad, 0);
      x2 = Math.max(x2 - pad, x1 + 1);
      y2 = Math.max(y2 - pad, y1 + 1);

      const cropId = uuidv4();
      const cropped = await sharp(file.buffer)
        .extract({ left: x1, top: y1, width: x2 - x1, height: y2 - y1 })
        .png()
        .toBuffer();

      const resized = await sharp(cropped)
        .resize(768, 768, { fit: "contain", background: "#ffffff" })
        .flatten()
        .png()
        .toBuffer();

      const s3Key = `refined/temp/${userId}/${cropId}.png`;
      const url = await uploadToS3(resized, s3Key);

      await redisClient.setEx(`onfit:crop:${userId}:${cropId}:url`, 86400, url);
      await redisClient.setEx(`onfit:crop:${userId}:${cropId}:label`, 86400, label);
      crops.push({ crop_id: cropId, category: label, bbox });
    }

    return crops;
  } finally {
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
  }
};

// ✅ 리파인
export const refineItem = async (userId, cropId) => {
  const url = await redisClient.get(`onfit:crop:${userId}:${cropId}:url`);
  if (!url) throw new NotExistsError("크롭 이미지가 만료되었습니다. 다시 감지해주세요.");

  const response = await axios.get(url, { responseType: "arraybuffer" });
  const inputBuffer = Buffer.from(response.data);
  const tempPath = path.join(os.tmpdir(), `input-${uuidv4()}.png`);

  try {
    await fs.promises.writeFile(tempPath, inputBuffer);

    const form = new FormData();
    form.append("file", fs.createReadStream(tempPath));

    const dockerRes = await axios.post("http://rmbg-api:7860/remove_bg", form, {
      headers: form.getHeaders(),
      responseType: "arraybuffer",
      timeout: 60000,
    });

    const refinedId = uuidv4();
    const buffer = Buffer.from(dockerRes.data);
    const s3Key = `refined/${userId}/${refinedId}.png`;
    const refinedUrl = await uploadToS3(buffer, s3Key);

    await redisClient.setEx(`onfit:refined:${userId}:${refinedId}:url`, 86400, refinedUrl);
    return { refined_id: refinedId };
  } catch (err) {
    throw new Error("배경 제거 서버 호출 실패: " + err.message);
  } finally {
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
  }
};

// ✅ 저장
export const saveItem = async (userId, refinedId) => {
  const refinedUrl = await redisClient.get(`onfit:refined:${userId}:${refinedId}:url`);
  if (!refinedUrl) throw new NotExistsError("리파인 이미지가 만료되었습니다.");

  const item = await itemRepository.create({
    userId,
    image: refinedUrl,
    category: 0,
    subcategory: 0,
    brand: null,
    color: 0,
    size: null,
    season: 0,
    purchaseDate: null,
    isDeleted: false,
  });

  return { id: item.id, image_url: refinedUrl };
};

// ✅ 크롭 삭제
export const deleteCropImage = async (userId, cropId) => {
  const urlKey   = `onfit:crop:${userId}:${cropId}:url`;
  const labelKey = `onfit:crop:${userId}:${cropId}:label`;
  const exists = await redisClient.get(urlKey);
  if (!exists) throw new NotExistsError("해당 크롭 이미지가 없습니다.");
  await redisClient.del(urlKey);
  await redisClient.del(labelKey);
  return { crop_id: cropId };
};
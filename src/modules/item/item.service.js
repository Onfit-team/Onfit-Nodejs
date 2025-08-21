// src/modules/item/item.service.js
import sharp from "sharp";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs";
import os from "os";
import redisClient from "../../utils/redis.js";
import { itemRepository } from "./item.repository.js";
import { uploadToS3 } from "../../utils/s3.js";
import { InvalidInputError, NotExistsError } from "../../utils/error.js";
import { runYolo } from "../../utils/yolo.js";
import { removeBackground } from "../../utils/rmbg.js";
import { analyzeImage } from "../wardrobe/openai.js";
import { analyzePattern } from "./tagging/analyzePattern.js";   // ✅ 패턴 분석 모듈
import { analyzeLength } from "./tagging/analyzeLength.js";   // ✅ 기장 분석 모듈
import { refineTags, refineCategorySub } from "./tagging/refineTags.js"; // ✅ 태그 후처리 + 카테고리/서브카테고리 보정
import { buildPromptFromJson } from "./tagging/buildPromptFromJson.js"; // ✅ 프롬프트 빌더
import { categoryMap, subcategoryMap, colorMap, seasonMap } from "./tagging/maps.js"; // ✅ 공용 매핑
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const ONE_DAY = 60 * 60 * 24;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ==========================================================
// kor → eng category 매핑
// ==========================================================
const korToEngMap = {
  상의: 1,
  하의: 2,
  원피스: 3,
  아우터: 4,
  신발: 5,
  액세서리: 6,
};

// ==========================================================
// 안전한 JSON 파서
// ==========================================================
function safeJsonParse(str) {
  try {
    const match = str.match(/\{[\s\S]*\}/);
    if (!match) return null;
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}

// ==========================================================
// 애매한 색상 재분석 (4: 베이지/브라운, 6: 레드/핑크, 7: 오렌지/옐로우)
// ==========================================================
async function refineAmbiguousColor(imagePath, colorCode) {
  // 재분석이 필요한 색상이 아니면 그대로 반환
  if (![4, 6, 7].includes(colorCode)) {
    return colorCode;
  }

  let prompt = "";
  
  if (colorCode === 4) { // 베이지/브라운 구분
    prompt = `
    Look at this clothing item and determine if it's beige/light brown or dark brown.
    JSON ONLY: { "color": "beige" or "brown" }
    
    beige: light brown, tan, khaki, sand, cream, camel
    brown: dark brown, chocolate, coffee, cognac, espresso
    
    Focus on the fabric's actual color.
    `;
  } else if (colorCode === 6) { // 레드/핑크 구분  
    prompt = `
    Look at this clothing item and determine if it's red or pink.
    JSON ONLY: { "color": "red" or "pink" }
    
    red: crimson, burgundy, wine, maroon, deep red, cherry
    pink: rose, coral, salmon, blush, light pink, magenta
    
    Focus on the fabric's actual color.
    `;
  } else if (colorCode === 7) { // 오렌지/옐로우 구분
    prompt = `
    Look at this clothing item and determine if it's orange or yellow.
    JSON ONLY: { "color": "orange" or "yellow" }
    
    orange: burnt orange, rust, coral orange, amber, peach
    yellow: gold, mustard, lemon, cream yellow, canary
    
    Focus on the fabric's actual color.
    `;
  }

  try {
    const imageData = fs.readFileSync(imagePath, { encoding: "base64" });
    const imageBase64 = `data:image/jpeg;base64,${imageData}`;

    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Precise clothing color analyzer for ambiguous colors" },
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: imageData } },
          ],
        },
      ],
      max_tokens: 50,
      temperature: 0.0,
    });

    const json = safeJsonParse(res.choices[0].message.content);
    const refinedColor = json?.color;
    
    console.log(`🎨 [Color Refinement] ${colorCode} → ${refinedColor}`);
    return refinedColor || colorCode;
  } catch (err) {
    console.warn("⚠️ refineAmbiguousColor 실패:", err.message);
    return colorCode;
  }
}

// ==========================================================
// base color 재추론 (color가 10인 경우만)
// ==========================================================
async function analyzeBaseColor(imagePath) {
  const prompt = `
  Identify the BASE fabric color of this clothing (ignore prints).
  Return only JSON: { "color": 1~9 }
  1: white, 2: black, 3: gray, 4: beige or brown,
  5: navy or blue, 6: red or pink, 7: orange or yellow,
  8: green, 9: purple
  `;

  const imageData = fs.readFileSync(imagePath, { encoding: "base64" });
  const imageBase64 = `data:image/jpeg;base64,${imageData}`;

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Base color detector for clothing" },
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          { type: "image_url", image_url: { url: imageBase64 } },
        ],
      },
    ],
    max_tokens: 100,
    temperature: 0.0,
  });

  const json = safeJsonParse(res.choices[0].message.content);
  return json?.color ?? 1;
}

// ==========================================================
// 1. YOLO 감지 및 Redis 저장 + S3 업로드 (crop_id 반환)
// ==========================================================
export async function detectAndCache(userId, file) {
  if (!file?.buffer) throw new InvalidInputError("이미지 파일이 필요합니다.");

  const detections = await runYolo(file.buffer);
  if (!detections.length) throw new InvalidInputError("의류를 감지하지 못했습니다.");

  // 전체 이미지 height 확보
  const meta = await sharp(file.buffer).metadata();
  const imageHeight = meta.height;

  const crops = [];
  const seenCategories = new Set();

  for (const det of detections) {
    let categoryId = 0;
    if (typeof det.label === "string") {
      categoryId = korToEngMap[det.label] ?? 0;
    } else if (typeof det.label === "number") {
      categoryId = det.label ?? 0;
    } else if (det.category) {
      categoryId = korToEngMap[det.category] ?? det.category;
    }
    if (!categoryId) continue;

    const category = categoryMap[categoryId] ?? "unknown";
    if (category === "unknown") continue;

    if (seenCategories.has(category)) continue;
    seenCategories.add(category);

    const cropId = uuidv4();

    // bbox crop
    const cropBuffer = await sharp(file.buffer)
      .extract({
        left: Math.floor(det.bbox[0]),
        top: Math.floor(det.bbox[1]),
        width: Math.floor(det.bbox[2] - det.bbox[0]),
        height: Math.floor(det.bbox[3] - det.bbox[1]),
      })
      .toBuffer();

    const bbox = {
      height: det.bbox[3] - det.bbox[1],
      imageHeight,
    };

    let tags = {
      category: categoryId,
      subcategory: 0,
      color: 0,
      season: 0,
      pattern: { patternType: "plain", layout: "plain", count: 0 },
      heightRatio: bbox.height / bbox.imageHeight,
    };

    try {
      const tmpPath = path.join(os.tmpdir(), `${cropId}.png`);
      fs.writeFileSync(tmpPath, cropBuffer);

      // 1차 태그 분석 (category, subcategory, color, season)
      const basicTags = await analyzeImage(tmpPath);

      // 애매한 색상 재분석 (4,6,7)
      let correctedTags = { ...basicTags };
      if ([4, 6, 7].includes(basicTags.color)) {
        console.log(`🎨 Refining ambiguous color ${basicTags.color}...`);
        const refinedColor = await refineAmbiguousColor(tmpPath, basicTags.color);
        
        // 문자열 결과를 숫자로 매핑
        const colorStringToNumber = {
          "beige": 4, "brown": 5,
          "red": 6, "pink": 7, 
          "orange": 8, "yellow": 9
        };
        
        if (typeof refinedColor === "string" && colorStringToNumber[refinedColor]) {
          correctedTags.color = colorStringToNumber[refinedColor];
          console.log(`✅ Color refined: ${refinedColor} (${correctedTags.color})`);
        }
      }

      // refineCategorySub 적용 (bbox 전달)
      correctedTags = refineCategorySub(correctedTags, bbox);

      tags = correctedTags;
      fs.unlinkSync(tmpPath);

      // Redis 저장 (raw tags)
      await redisClient.setEx(
        `crop:${userId}:${cropId}:tags:raw`,
        ONE_DAY,
        JSON.stringify(basicTags)
      );
    } catch (err) {
      console.warn("⚠️ analyzeImage 실패, 기본 태그 사용", err.message);
    }

    // Redis 저장 (최종 보정된 태그)
    await redisClient.setEx(`crop:${userId}:${cropId}`, ONE_DAY, cropBuffer.toString("base64"));
    await redisClient.setEx(`crop:${userId}:${cropId}:bbox`, ONE_DAY, JSON.stringify(det.bbox));
    await redisClient.setEx(`crop:${userId}:${cropId}:tags`, ONE_DAY, JSON.stringify(tags));

    // S3 업로드
    const s3Key = `crops/${userId}/${cropId}.png`;
    await uploadToS3(cropBuffer, s3Key);

    crops.push({
      crop_id: cropId,
      category,
      bbox: det.bbox,
    });
  }

  return crops;
}

// ==========================================================
// 2. refine - RMBG → 패턴 분석 → 프롬프트 생성 → DALL·E generations
// ==========================================================
export const refineFromCrop = async (userId, cropId) => {
  const base64 = await redisClient.get(`crop:${userId}:${cropId}`);
  if (!base64) throw new NotExistsError("크롭 이미지가 만료되었습니다.");

  // 1) Redis → Buffer
  const inputBuffer = Buffer.from(base64, "base64");

  // 2) 배경 제거
  const rmbgBuffer = await removeBackground(inputBuffer);

  // 3) 흰 배경 합성
  const meta = await sharp(rmbgBuffer).metadata();
  const withWhiteBG = await sharp({
    create: {
      width: meta.width,
      height: meta.height,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .composite([{ input: rmbgBuffer, blend: "over" }])
    .png()
    .toBuffer();

  // 4) detect 단계에서 저장한 기본 tags 불러오기
  const tagJson = await redisClient.get(`crop:${userId}:${cropId}:tags`);
  if (!tagJson) throw new NotExistsError("detect 태그 없음");

  let tags;
  try {
    tags = JSON.parse(tagJson);
  } catch {
    throw new InvalidInputError("태그 JSON 파싱 실패");
  }

  // 5) 패턴 분석
  const tmpPath = path.join(os.tmpdir(), `${uuidv4()}.png`);
  fs.writeFileSync(tmpPath, withWhiteBG);
  const pattern = await analyzePattern(tmpPath);
  
  // ✅ color가 10인 경우 재분석
  if (tags.color === 10) {
    console.log("⚠️ Color 10 (multi/pattern) in refine stage, re-analyzing...");
    const baseColor = await analyzeBaseColor(tmpPath);
    tags.color = baseColor;
    console.log(`✅ Re-analyzed color in refine: ${baseColor}`);
  }
  
  // ✅ 기장 분석이 필요한 subcategory 체크
  const needsLengthAnalysis = [3, 4, 5, 6]; // jeans, training pants, leggings, skirt
  let lengthInfo = null;
  
  if (needsLengthAnalysis.includes(tags.subcategory)) {
    const subcategoryName = subcategoryMap[`${tags.category}:${tags.subcategory}`];
    console.log(`🔍 Analyzing length for ${subcategoryName}...`);
    lengthInfo = await analyzeLength(tmpPath, subcategoryName);
    console.log("👖 [Length Result]:", lengthInfo);
  }
  
  fs.unlinkSync(tmpPath);

  // 6) 패턴 정보를 기존 태그에 병합
  const mergedTags = {
    ...tags, // 기존 tags (category, subcategory, color, season 등)
    pattern, // 새로 분석된 패턴 정보
    ...(lengthInfo ? { length: lengthInfo } : {}) // 기장 정보 추가
  };
  
  console.log("🔍 [refineFromCrop] Before refineTags - merged:", JSON.stringify(mergedTags, null, 2));
  
  // refineTags 적용
  let refined = refineTags(mergedTags);
  console.log("🔍 [refineFromCrop] After refineTags:", JSON.stringify(refined, null, 2));

  // refineCategorySub 적용
  refined = refineCategorySub(refined, {
    height: refined.heightRatio * meta.height,
    imageHeight: meta.height,
  });
  console.log("🔍 [refineFromCrop] After refineCategorySub:", JSON.stringify(refined, null, 2));

  // ✅ 디버그 로그 추가
  console.log("DEBUG patternDescription after refine:", refined.pattern?.patternDescription);
  console.log("DEBUG color after refine:", refined.color);
  console.log("DEBUG colorMap result:", colorMap[refined.color]);
  
  // subcategoryName fallback 수정
  refined.subcategoryName =
    subcategoryMap[`${refined.category}:${refined.subcategory}`] ?? "unknown";

  // 7) Prompt 생성 - refined 객체 전체를 전달하여 color 정보 포함
  let prompt = buildPromptFromJson(refined, refined.pattern);

  console.log("📊 [Pattern Final]:", pattern);
  console.log("✅ [Tags Final]:", JSON.stringify(refined, null, 2));
  console.log("🖼️ Prompt:", prompt);

  // 8) OpenAI 이미지 생성 (axios)
  const dalleRes = await axios.post(
    "https://api.openai.com/v1/images/generations",
    {
      model: "dall-e-3",
      prompt,
      size: "1024x1024",
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const refinedUrl = dalleRes.data.data[0].url;
  const refinedId = uuidv4();

  await redisClient.setEx(`refined:${userId}:${refinedId}:url`, ONE_DAY, refinedUrl);

  return { refined_id: refinedId, preview_url: refinedUrl };
};

// ==========================================================
// 3. save - 최종 DB 저장
// ==========================================================
export const saveItem = async (userId, refinedId) => {
  const refinedUrl = await redisClient.get(`refined:${userId}:${refinedId}:url`);
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

// ==========================================================
// 4. crop 삭제
// ==========================================================
export const deleteCropImage = async (userId, cropId) => {
  const keys = [
    `crop:${userId}:${cropId}`,
    `crop:${userId}:${cropId}:bbox`,
    `crop:${userId}:${cropId}:tags`,
    `crop:${userId}:${cropId}:tags:raw`,
  ];
  const deleted = await redisClient.del(keys);
  if (!deleted) throw new NotExistsError("삭제할 크롭 이미지를 찾을 수 없습니다.");
  return { deleted: true };
};

// ==========================================================
// 5. 단순 업로드
// ==========================================================
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
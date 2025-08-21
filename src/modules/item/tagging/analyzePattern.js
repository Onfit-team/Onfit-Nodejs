import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { normalizePattern } from "./normalizePattern.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Buffer → data URI 변환
 */
function toDataUri(input, mime = "image/jpeg") {
  if (Buffer.isBuffer(input)) {
    return `data:${mime};base64,${input.toString("base64")}`;
  }
  if (typeof input === "string" && fs.existsSync(input)) {
    const base64 = fs.readFileSync(input, { encoding: "base64" });
    return `data:${mime};base64,${base64}`;
  }
  throw new Error("Invalid image input: must be Buffer or file path");
}

/**
 * 간단한 패턴 이름 추출 (motif 전용) - 개선된 버전
 */
function extractPatternName(desc) {
  if (!desc) return null;
  
  // 먼저 구체적인 동물/캐릭터 이름을 찾기
  const animalKeywords = [
    'bear', 'teddy bear', 'cat', 'dog', 'rabbit', 'bunny', 'tiger', 'lion',
    'elephant', 'penguin', 'duck', 'bird', 'fox', 'wolf', 'panda', 'koala'
  ];
  
  const characterKeywords = [
    'mickey mouse', 'minnie mouse', 'spongebob', 'pikachu', 'hello kitty',
    'winnie the pooh', 'mario', 'sonic', 'batman', 'superman'
  ];
  
  const descLower = desc.toLowerCase();
  
  // 캐릭터 먼저 체크
  for (const char of characterKeywords) {
    if (descLower.includes(char)) {
      return `${char} motif`;
    }
  }
  
  // 동물 체크
  for (const animal of animalKeywords) {
    if (descLower.includes(animal)) {
      return `${animal} motif`;
    }
  }
  
  // 기존 로직 (일반적인 단어 추출)
  const tokens = desc
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(
      (w) =>
        w.length > 2 &&
        ![
          "motif", "pattern", "design", "print", "element", "character",
          "with", "and", "surrounding", "large", "small", "text", "single"
        ].includes(w)
    );
  return tokens.length > 0 ? `${tokens[0]} motif` : null;
}

/**
 * 룰 기반 Fallback
 */
function detectPattern(aiTags) {
  if (!aiTags || !aiTags.pattern) return normalizePattern(null);

  const { pattern, repeat, count, layout } = aiTags;

  if (repeat && count > 3) {
    return normalizePattern(pattern, layout || "all-over", count);
  }
  return normalizePattern(pattern, layout || "center", count || 1);
}

/**
 * OpenAI 기반 패턴 분석 - 개선된 프롬프트
 */
export async function analyzePattern(imageInput, cacheKey = null, redisClient = null, aiTags = null) {
  const imageData = toDataUri(imageInput);

  const prompt = `
  Analyze the clothing pattern/motif in this image with SPECIFIC DETAILS.
  Focus on fabric patterns and printed designs (ignore wrinkles, shadows, folds).

  JSON ONLY:
  {
    "patternType": string,
    "layout": string,
    "count": number,
    "confidence": 0.0~1.0,
    "patternDescription": string
  }

  DETAILED RECOGNITION RULES:
  - Solid fabric → "plain"
  - Denim, knit, weave texture → "plain"
  - Vertical/horizontal lines → "stripe"
  - Grid/tartan/plaid → "checkered"  
  - Small dots/circles → "dots"
  - Flowers/plants → "floral"
  - Text/logo only → "logo"
  - Military camouflage → "camouflage"

  FOR MOTIFS - BE VERY SPECIFIC:
  - Bear/teddy bear → patternDescription: "bear character motif" or "teddy bear motif"
  - Cat → patternDescription: "cat motif" 
  - Dog → patternDescription: "dog motif"
  - Any animal → patternDescription: "[specific animal] motif"
  - Mickey Mouse → patternDescription: "Mickey Mouse character motif"
  - Other characters → patternDescription: "[character name] motif"
  - Fruits → patternDescription: "[fruit name] motif" (e.g. "strawberry motif")
  - Objects → patternDescription: "[object name] motif"

  IMPORTANT: In patternDescription, always identify the SPECIFIC subject (bear, cat, strawberry, etc.), not just "character" or "animal"!
  `;

  let parsed = null;

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a detailed fashion pattern analyzer. Always identify specific animals, characters, and objects in motifs." },
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: imageData } },
          ],
        },
      ],
      max_tokens: 250,
      temperature: 0.1,
    });

    const match = res.choices[0].message.content.match(/\{[\s\S]*\}/);
    if (match) parsed = JSON.parse(match[0]);
  } catch (err) {
    console.warn("⚠️ analyzePattern JSON parse 실패:", err.message);
  }

  let result;
  if (!parsed) {
    console.log("⚠️ OpenAI 실패 → 룰 기반 detectPattern 사용");
    result = {
      ...detectPattern(aiTags),
      confidence: 0.0,
      patternDescription: "plain",
    };
  } else {
    // denim/knit/weave → plain 처리
    const desc = parsed.patternDescription?.toLowerCase() ?? "";
    if (/(denim|jean|knit|weave)/.test(desc)) {
      parsed.patternType = "plain";
      parsed.layout = "plain";
      parsed.patternDescription = "plain fabric (denim/knit/weave treated as plain)";
    }

    // patternDescription에 motif 키워드가 있으면 patternType을 motif로 강제 수정
    if (parsed.patternDescription && parsed.patternDescription.toLowerCase().includes('motif')) {
      parsed.patternType = "motif";
      console.log("🔧 [Pattern Fix] patternDescription contains 'motif', correcting patternType to 'motif'");
    }

    const normalized = normalizePattern(parsed.patternType, parsed.layout, parsed.count ?? 1);

    let patternName = null;
    if (normalized.patternType === "motif" && parsed.patternDescription) {
      patternName = extractPatternName(parsed.patternDescription);
    }

    result = {
      ...normalized,
      confidence: parsed.confidence ?? 0.5,
      patternDescription: parsed.patternDescription ?? "plain",
      ...(patternName ? { patternName } : {}),
    };
  }

  if (redisClient && cacheKey) {
    await redisClient.setEx(`${cacheKey}:pattern`, 86400, JSON.stringify(result));
  }

  console.log("📊 [Pattern Raw]:", parsed);
  console.log("✅ [Pattern Final]:", result);

  return result;
}
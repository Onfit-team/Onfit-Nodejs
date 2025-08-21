import OpenAI from "openai";
import fs from "fs";

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
 * 기장 분석 함수
 * @param {string|Buffer} imageInput - 이미지 경로 또는 Buffer
 * @param {string} subcategoryName - "jeans", "skirt", "training pants", "leggings" 등
 * @returns {Promise<{length: string, confidence: number}>}
 */
export async function analyzeLength(imageInput, subcategoryName) {
  const imageData = toDataUri(imageInput);
  
  let prompt = "";
  
  // 카테고리별 맞춤 프롬프트
  if (subcategoryName === "jeans") {
    prompt = `
    Analyze the length of these jeans/denim pants.
    JSON ONLY:
    {
      "length": string,
      "confidence": 0.0~1.0
    }
    
    Length categories for jeans:
    - "short" → above knee, shorts length, bermuda shorts
    - "cropped" → mid-calf, 7/8 length, capri length  
    - "long" → full length, ankle length, regular length
    
    Focus on where the hem ends relative to the legs.
    `;
  } else if (subcategoryName === "skirt") {
    prompt = `
    Analyze the length of this skirt.
    JSON ONLY:
    {
      "length": string,
      "confidence": 0.0~1.0
    }
    
    Length categories for skirts:
    - "mini" → above mid-thigh, very short
    - "short" → mid-thigh to above knee
    - "knee" → at or just below knee length
    - "midi" → below knee to mid-calf
    - "long" → below mid-calf, ankle length, maxi
    
    Focus on where the hem ends relative to the legs.
    `;
  } else if (subcategoryName === "training pants") {
    prompt = `
    Analyze the length of these training/sports pants.
    JSON ONLY:
    {
      "length": string,
      "confidence": 0.0~1.0
    }
    
    Length categories for training pants:
    - "short" → above knee, shorts length
    - "cropped" → mid-calf, 7/8 length, capri length
    - "long" → full length, ankle length
    
    Focus on where the hem ends relative to the legs.
    `;
  } else if (subcategoryName === "leggings") {
    prompt = `
    Analyze the length of these leggings.
    JSON ONLY:
    {
      "length": string,
      "confidence": 0.0~1.0
    }
    
    Length categories for leggings:
    - "short" → above knee, shorts length
    - "cropped" → mid-calf, 7/8 length, capri length  
    - "long" → full length, ankle length
    
    Focus on where the hem ends relative to the legs.
    `;
  } else {
    // 기본 하의 분석
    prompt = `
    Analyze the length of this bottom garment.
    JSON ONLY:
    {
      "length": string,
      "confidence": 0.0~1.0
    }
    
    Length categories:
    - "short" → above knee length
    - "cropped" → mid-calf length
    - "long" → ankle/full length
    
    Focus on where the hem ends relative to the legs.
    `;
  }

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a clothing length analyzer. Be precise about garment lengths." },
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: imageData } },
          ],
        },
      ],
      max_tokens: 100,
      temperature: 0.1,
    });

    const match = res.choices[0].message.content.match(/\{[\s\S]*\}/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      console.log("👖 [Length Analysis]:", parsed);
      return {
        length: parsed.length || "long",
        confidence: parsed.confidence || 0.5
      };
    }
  } catch (err) {
    console.warn("⚠️ analyzeLength 실패:", err.message);
  }

  // fallback - 기본값 반환
  return {
    length: "long",
    confidence: 0.0
  };
}
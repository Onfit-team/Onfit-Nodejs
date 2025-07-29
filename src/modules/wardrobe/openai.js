// openai.js
import { OpenAI } from "openai";
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // .env에 저장
});

/**
 * GPT-4 Vision으로 옷 사진을 분석하고 category, subcategory, season, color 예측
 * @param {string} imagePath - 업로드된 이미지 경로
 * @param {string} prompt - 사용자 입력 설명 (선택)
 * @returns {Promise<{category: number, subcategory: number, season: number, color: number}>}
 */
export const analyzeImage = async (imagePath, prompt = '') => {
  const basePrompt = `
너는 사용자가 업로드한 옷 사진을 분석해서 다음 4가지 정보를 추론하는 AI야. 각 값은 아래 숫자 코드 중 하나로 답해야 해.

(1) category (대분류)
- 1: 상의, 2: 하의, 3: 원피스, 4: 아우터, 5: 신발, 6: 액세서리

(2) subcategory (소분류)는 category에 따라 다름 (예: 상의일 경우 1=반팔티셔츠, 2=긴팔티셔츠 등)

(3) season (계절)
- 1: 간절기, 2: 여름, 3: 겨울

(4) color (색상)
- 1: 화이트, 2: 블랙, 3: 그레이, 4: 베이지/브라운, 5: 네이비/블루, 6: 레드/핑크, 7: 오렌지/옐로우, 8: 그린, 9: 퍼플, 10: 멀티/패턴

이미지를 보고 다음 형식으로 정확하게 숫자만 JSON으로 응답해:
{
  "category": 1,
  "subcategory": 1,
  "season": 2,
  "color": 4
}
  `;

  const fullPrompt = prompt ? `${basePrompt}\n\n사용자 설명: ${prompt}` : basePrompt;

  const imageData = fs.readFileSync(path.resolve(imagePath), { encoding: 'base64' });
  const imageBase64 = `data:image/jpeg;base64,${imageData}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "이미지 속 의류 정보를 분석하는 AI입니다.",
      },
      {
        role: "user",
        content: [
          { type: "text", text: fullPrompt },
          {
            type: "image_url",
            image_url: {
              url: imageBase64,
            },
          },
        ],
      },
    ],
    max_tokens: 300,
    temperature: 0.2,
  });

  const message = response.choices[0].message.content;
  console.log('GPT 응답:', message);

  try {
     const clean = message
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim();

    const json = JSON.parse(clean);
    return {
      category: json.category,
      subcategory: json.subcategory,
      season: json.season,
      color: json.color
    };
  } catch (e) {
    throw new Error(`GPT 응답 파싱 실패: ${message}`);
  }
};

export default openai;

// 안전한 JSON 파서
export function safeJsonParse(str) {
  try {
    if (!str || typeof str !== "string") return null;

    // GPT가 ```json ... ``` 으로 감싸는 경우 제거
    const clean = str
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(clean);
  } catch (err) {
    console.warn("⚠️ safeJsonParse 실패:", err.message, "\n원본:", str);
    return null;
  }
}

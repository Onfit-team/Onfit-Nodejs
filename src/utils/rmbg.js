import axios from "axios";
import FormData from "form-data";

const RMBG_API = process.env.RMBG_API_BASE_URL || "http://rmbg-api:7860";

/**
 * rmbg-api로 배경제거 요청
 * @param {Buffer} imageBuffer - 원본 이미지
 * @param {string} filename - 업로드할 파일명
 * @returns {Promise<Buffer>} 배경 제거된 PNG
 */
export async function removeBackground(imageBuffer, filename = "image.png") {
  const form = new FormData();
  form.append("file", imageBuffer, { filename });

  const res = await axios.post(`${RMBG_API}/rmbg`, form, {
    headers: form.getHeaders(),
    timeout: 30000,
    responseType: "arraybuffer", // PNG bytes 그대로 받기
    maxContentLength: 20 * 1024 * 1024,
  });

  return Buffer.from(res.data);
}

import ort from "onnxruntime-node";
import sharp from "sharp";

const RMBG_MODEL_PATH = "src/modules/item/RMBG-1.4/onnx/model.onnx";
let onnxSession = null;

/** ONNX 세션 초기화 */
export async function initOnnx() {
  if (!onnxSession) {
    onnxSession = await ort.InferenceSession.create(RMBG_MODEL_PATH);
    console.log("[RMBG] ONNX 모델 로드 완료");
  }
}

/** 배경제거 (1024x1024) */
export async function removeBackground(imageBuffer) {
  await initOnnx();

  // RGB로 변환 후 정규화
  const { data, info } = await sharp(imageBuffer)
    .resize(1024, 1024)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const float32Data = new Float32Array(info.width * info.height * 3);
  for (let i = 0; i < data.length; i++) {
    float32Data[i] = data[i] / 255;
  }

  const tensor = new ort.Tensor("float32", float32Data, [1, 3, info.height, info.width]);
  const results = await onnxSession.run({ input: tensor });
  const maskData = results[onnxSession.outputNames[0]].data;

  // 마스크 적용
  const maskBuffer = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) {
    const alpha = Math.min(255, Math.max(0, maskData[i] * 255));
    maskBuffer[i * 4] = data[i * 3];
    maskBuffer[i * 4 + 1] = data[i * 3 + 1];
    maskBuffer[i * 4 + 2] = data[i * 3 + 2];
    maskBuffer[i * 4 + 3] = alpha;
  }

  return sharp(maskBuffer, {
    raw: { width: info.width, height: info.height, channels: 4 },
  }).png().toBuffer();
}

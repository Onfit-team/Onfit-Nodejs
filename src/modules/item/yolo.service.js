import fs from "fs";
import os from "os";
import path from "path";
import { spawn } from "child_process";
import { v4 as uuidv4 } from "uuid";

export const runYolo = (buffer) => {
  return new Promise((resolve, reject) => {
    const tempPath = path.join(os.tmpdir(), `input-${uuidv4()}.png`);
    fs.writeFileSync(tempPath, buffer); // 저장

    const py = spawn("python", [
      "src/modules/item/predict_v8.py", // YOLOv8용 새 스크립트
      "src/modules/item/yolo_models/best.pt",
      tempPath,
    ]);

    let stdout = "";
    let stderr = "";

    py.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    py.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    py.on("error", (err) => {
      reject(new Error("Python 실행 실패: " + err.message));
    });

    py.on("close", (code) => {
      fs.unlinkSync(tempPath);
      if (code !== 0) return reject(new Error("YOLO 예측 실패:\n" + stderr));

      try {
        // 마지막 줄만 추출하여 JSON 파싱
        const lines = stdout.trim().split("\n");
        const lastLine = lines[lines.length - 1];
        const result = JSON.parse(lastLine);
        resolve(result);
      } catch (e) {
        reject(new Error("YOLO 결과 파싱 오류: " + e.message + "\n출력: " + stdout));
      }
    });
  });
};

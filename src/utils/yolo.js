import fs from "fs";
import os from "os";
import path from "path";
import { spawn } from "child_process";
import { v4 as uuidv4 } from "uuid";

export const runYolo = (buffer) => {
  return new Promise((resolve, reject) => {
    const tempPath = path.join(os.tmpdir(), `input-${uuidv4()}.png`);
    fs.writeFileSync(tempPath, buffer);

    const py = spawn("python3", [
      "src/modules/item/yolo/predict_v8.py",
      "src/modules/item/yolo/yolo_models/best.pt",
      tempPath,
    ]);

    let stdout = "";
    let stderr = "";

    py.stdout.on("data", (data) => (stdout += data.toString()));
    py.stderr.on("data", (data) => (stderr += data.toString()));
    py.on("error", (err) => reject(new Error("Python 실행 실패: " + err.message)));

    py.on("close", (code) => {
      fs.unlinkSync(tempPath);
      if (code !== 0) return reject(new Error("YOLO 예측 실패:\n" + stderr));

      try {
        const lastLine = stdout.trim().split("\n").pop();
        resolve(JSON.parse(lastLine));
      } catch (e) {
        reject(new Error("YOLO 결과 파싱 오류: " + e.message + "\n출력: " + stdout));
      }
    });
  });
};

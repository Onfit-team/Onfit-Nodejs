// src/utils/python.js
import { spawn } from "child_process";

export const runPython = (scriptPath, args = []) => {
  return new Promise((resolve, reject) => {
    // Docker 컨테이너 내 venv Python 강제 사용 (경로 수정)
    const py = spawn("/app/.venv/bin/python", [scriptPath, ...args], {
      env: process.env, // 환경 변수 유지
    });

    let stdout = "";
    let stderr = "";

    py.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    py.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    py.on("close", (code) => {
      if (stderr.trim()) {
        console.error("🔴 Python stderr:", stderr.trim());
      }
      if (code !== 0) {
        return reject(
          new Error(`Python 종료 오류 (code ${code}):\n${stderr}`)
        );
      }

      // JSON 배열만 추출 (마지막 [] 블록만)
      const match = stdout.match(/\[[\s\S]*\]$/m);
      const jsonText = match ? match[0] : stdout.trim();

      resolve(jsonText);
    });

    py.on("error", (err) => {
      reject(new Error("Python 실행 실패: " + err.message));
    });
  });
};

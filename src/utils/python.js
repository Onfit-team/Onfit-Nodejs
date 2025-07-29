import { spawn } from "child_process";

export const runPython = (scriptPath, args = []) => {
  return new Promise((resolve, reject) => {
    const py = spawn("python", [scriptPath, ...args]);

    let stdout = "";
    let stderr = "";

    py.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    py.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    py.on("close", (code) => {
      if (code !== 0) {
        return reject(new Error(`Python 종료 오류:\n${stderr}`));
      }
      resolve(stdout.trim()); // JSON 등 텍스트 반환
    });

    py.on("error", (err) => {
      reject(new Error("Python 실행 실패: " + err.message));
    });
  });
};

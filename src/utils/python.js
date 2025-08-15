import { spawn } from "child_process";

export function runPython(scriptPath, args = []) {
  return new Promise((resolve, reject) => {
    const py = spawn("python3", [scriptPath, ...args], { stdio: ["ignore", "pipe", "pipe"] });

    let stdout = "";
    let stderr = "";

    py.stdout.on("data", (data) => (stdout += data.toString()));
    py.stderr.on("data", (data) => (stderr += data.toString()));

    py.on("close", (code) => {
      if (code !== 0) reject(new Error(stderr || "Python 실행 실패"));
      else resolve(stdout.trim());
    });
  });
}

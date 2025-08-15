import { execFile } from "child_process";
import path from "path";
import fs from "fs";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export async function removeBackground(buffer) {
  const inputPath = path.join("/tmp", `input-${Date.now()}.png`);
  const outputPath = path.join("/tmp", `output-${Date.now()}.png`);

  await fs.promises.writeFile(inputPath, buffer);
  const scriptPath = path.resolve("src/modules/item/rmbg/inference_rmbg.py");

  try {
    await execFileAsync("python3", [scriptPath, inputPath, outputPath]);
    const resultBuffer = await fs.promises.readFile(outputPath);

    fs.promises.unlink(inputPath).catch(() => {});
    fs.promises.unlink(outputPath).catch(() => {});

    return resultBuffer;
  } catch (err) {
    console.error("[RMBG] Python 실행 실패:", err);
    throw new Error("배경제거 실패");
  }
}

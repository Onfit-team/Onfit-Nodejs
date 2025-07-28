import fs from 'fs/promises';
import path from 'path';

export const uploadYoloModel = async (file) => {
  const modelDir = path.resolve('src/modules/item/yolo_models');
  const savePath = path.join(modelDir, 'best.pt');

  // 경로가 없으면 생성
  await fs.mkdir(modelDir, { recursive: true });

  // 기존 파일 백업하고 저장 (선택)
  const backupPath = path.join(modelDir, `backup_best_${Date.now()}.pt`);
  try {
    await fs.copyFile(savePath, backupPath);
  } catch (_) {
    // 처음 업로드일 경우 무시
  }

  // 덮어쓰기
  await fs.writeFile(savePath, file.buffer);
};
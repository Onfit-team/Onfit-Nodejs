import fs from 'fs';
import path from 'path';
import { CreatedSuccess } from '../../utils/success.js';

// [POST] /model/upload
export const uploadBestModel = async (req, res, next) => {
  try {
    const MODEL_DIR = path.join(process.cwd(), 'yolo_models');
    const MODEL_PATH = path.join(MODEL_DIR, 'best.pt');
    if (!req.file) return res.status(400).json({ error: '모델 파일이 필요합니다.' });

    if (!fs.existsSync(MODEL_DIR)) fs.mkdirSync(MODEL_DIR, { recursive: true });

    // 기존 모델 백업(선택)
    if (fs.existsSync(MODEL_PATH)) {
      const backupName = `best_${Date.now()}.pt`;
      fs.renameSync(MODEL_PATH, path.join(MODEL_DIR, backupName));
    }

    // 새 모델로 교체
    fs.renameSync(req.file.path, MODEL_PATH);

    res.status(201).json(new CreatedSuccess({ path: MODEL_PATH }, "best.pt 업로드 및 교체 성공"));
  } catch (err) {
    next(err);
  }
};

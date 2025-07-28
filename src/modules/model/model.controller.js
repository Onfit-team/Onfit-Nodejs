import { uploadYoloModel } from './model.service.js';
import { CreatedSuccess } from '../../utils/success.js';

export const uploadModel = async (req, res, next) => {
  try {
    const file = req.file;
    if (!file || !file.buffer || !file.originalname.endsWith('.pt')) {
      throw new Error('업로드할 .pt 모델 파일이 필요합니다.');
    }

    await uploadYoloModel(file);
    res.status(201).json(new CreatedSuccess(null, 'YOLO 모델 업로드 성공'));
  } catch (err) {
    next(err);
  }
};

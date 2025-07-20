import { trainYoloModel } from './model.service.js';
import { CreatedSuccess } from '../../utils/success.js';

export const trainModel = async (req, res, next) => {
  try {
    // 이미 미들웨어에서 인증/권한 체크됨!
    const { datasetId, mode } = req.body;
    if (!datasetId || !mode) {
      // 기존 에러 유틸
      throw new Error("datasetId, mode 값이 필요합니다.");
    }

    const result = await trainYoloModel(datasetId, mode);

    // 기존 유틸 응답
    res.status(201).json(
      new CreatedSuccess(result, "TRAINING_STARTED")
    );
  } catch (err) {
    next(err);
  }
};

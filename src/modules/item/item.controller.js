import * as itemService from './item.service.js';
import { CreatedSuccess, OkSuccess } from '../../utils/success.js';
import { CustomError, UnauthorizedError } from '../../utils/error.js';

// YOLO 크롭 → 캐시에 임시 저장
export const cropAndSave = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?.userId;
    if (!userId) throw new CustomError("로그인 필요", "UNAUTHORIZED", 401);

    const result = await itemService.cropAndCache(userId, req.file);

    res.status(201).json(new CreatedSuccess(result, "Cropping Complete (Cached)"));
  } catch (err) {
    next(err);
  }
};


// 사용자 선택 → DB에 저장 + 스타일 변환
export const transformSelectedCrop = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?.userId;
    if (!userId) throw new CustomError("로그인 필요", "UNAUTHORIZED", 401);

    const { crop_id, prompt } = req.body;
    const transformedImage = await itemService.saveAndTransform(userId, crop_id, prompt);

    res.status(200).json(new OkSuccess({ transformed_image: transformedImage }, "Transform Complete"));
  } catch (err) {
    next(err);
  }
};

// 삭제 API
export const removeItem = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?.userId;
    if (!userId) throw new UnauthorizedError("로그인 필요");

    const { item_id } = req.params;
    const result = await itemService.removeItem(item_id, userId);

    res.status(200).json(new OkSuccess(result, "CROP_DELETED"));
  } catch (err) {
    next(err);
  }
};

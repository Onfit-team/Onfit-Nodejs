import * as itemService from './item.service.js';
import { CreatedSuccess, OkSuccess } from '../../utils/success.js';
import { CustomError, InvalidInputError, NotExistsError } from '../../utils/error.js';

// ✅ 1. 크롭 API
export const detectItems = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new CustomError("로그인 필요", "UNAUTHORIZED", 401);

    const file = req.file;
    if (!file || !file.buffer) throw new InvalidInputError("이미지 파일이 필요합니다.");

    const crops = await itemService.detectAndCache(userId, file);

    res.status(201).json(new CreatedSuccess({ crops }, "아이템 감지 성공"));
  } catch (err) {
    next(err);
  }
};

// ✅ 2. 리파인 API
export const refineItem = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new CustomError("로그인 필요", "UNAUTHORIZED", 401);

    const { crop_id, prompt } = req.body;
    if (!crop_id || !prompt) {
      throw new InvalidInputError("crop_id와 prompt는 필수입니다.");
    }

    const refinedImage = await itemService.refineItem(userId, crop_id, prompt);

    res.status(200).json(new OkSuccess({ refined_image: refinedImage }, "아이템 리파인 성공"));
  } catch (err) {
    next(err);
  }
};

// ✅ 3. 저장 API
export const saveItem = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new CustomError("로그인 필요", "UNAUTHORIZED", 401);

    const { crop_id, prompt } = req.body;
    if (!crop_id || !prompt) {
      throw new InvalidInputError("crop_id와 prompt는 필수입니다.");
    }

    const savedItem = await itemService.saveItem(userId, crop_id, prompt);

    res.status(201).json(new CreatedSuccess(savedItem, "아이템 저장 성공"));
  } catch (err) {
    next(err);
  }
};

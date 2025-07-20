import * as itemService from './item.service.js';
import { CreatedSuccess, OkSuccess } from '../../utils/success.js';
import { CustomError, UnauthorizedError } from '../../utils/error.js';

export const cropAndSave = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?.userId;
    if (!userId) throw new CustomError("로그인 필요", "UNAUTHORIZED", 401);

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const result = await itemService.cropAndSave(userId, req.file, baseUrl);

    res.status(201).json(new CreatedSuccess(result, "Cropping Complete"));
  } catch (err) {
    next(err);
  }
};

export const removeItem = async (req, res, next) => {
  try {
    console.log('req.user:', req.user); // user 객체 로그로 디버깅
    const userId = req.user?.id || req.user?.userId;
    if (!userId) throw new UnauthorizedError("로그인 필요");
    const { item_id } = req.params;
    const result = await itemService.removeItem(item_id, userId);
    res.status(200).json(new OkSuccess(result, "CROP_DELETED"));
  } catch (err) {
    next(err);
  }
};

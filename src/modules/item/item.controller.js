import * as itemService from "./item.service.js";
import { OkSuccess } from "../../utils/success.js";
import { CustomError, InvalidInputError, UnauthorizedError } from "../../utils/error.js";

export const detectItems = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new CustomError("로그인이 필요합니다", "UNAUTHORIZED", 401);
    if (!req.file?.buffer) throw new InvalidInputError("이미지 파일이 필요합니다.");

    const crops = await itemService.detectAndCache(userId, req.file);
    res.status(200).json(new OkSuccess({ crops }, "아이템 감지 성공"));
  } catch (err) {
    next(err);
  }
};

export const refineItem = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new CustomError("로그인이 필요합니다", "UNAUTHORIZED", 401);
    const { cropId } = req.body;
    if (!cropId) throw new InvalidInputError("cropId가 필요합니다.");

    const result = await itemService.refineFromCrop(userId, cropId);
    res.status(200).json(new OkSuccess(result, "리파인 성공"));
  } catch (err) {
    next(err);
  }
};

export const saveItem = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new CustomError("로그인이 필요합니다", "UNAUTHORIZED", 401);
    
    const { refinedId, outfitId } = req.body;
    if (!refinedId) throw new InvalidInputError("refinedId가 필요합니다.");

    const result = await itemService.saveItem(userId, refinedId, outfitId);
    res.status(200).json(new OkSuccess(result, "저장 성공"));
  } catch (err) {
    next(err);
  }
};

export const deleteCrop = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new UnauthorizedError("로그인이 필요합니다");

    const { cropId } = req.params;
    if (!cropId) throw new InvalidInputError("cropId가 필요합니다.");

    const result = await itemService.deleteCropImage(userId, cropId);
    res.status(200).json(new OkSuccess(result, "크롭 이미지 삭제 완료"));
  } catch (err) {
    next(err);
  }
};

export const uploadImage = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new UnauthorizedError("로그인이 필요합니다");

    const file = req.file;
    if (!file?.buffer) throw new InvalidInputError("이미지 파일이 필요합니다.");

    const result = await itemService.uploadImage(userId, file);
    res.status(200).json(new OkSuccess(result, "이미지 업로드 완료"));
  } catch (err) {
    next(err);
  }
};
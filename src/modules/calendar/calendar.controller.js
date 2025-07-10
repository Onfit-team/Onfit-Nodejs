import * as calendarService from './calendar.service.js';
import { OkSuccess } from '../../utils/success.js';
import { InvalidInputError } from '../../utils/error.js';

// 🖼 메인 이미지 조회
export const getOutfitMainImage = async (req, res, next) => {
  try {
    const { outfit_id } = req.params;
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const result = await calendarService.getMainImageInfo(outfit_id, baseUrl);
    res.status(200).json(new OkSuccess(result, "메인 이미지 조회 성공"));
  } catch (err) {
    next(err);
  }
};

// 📝 메모 조회
export const getOutfitMemo = async (req, res, next) => {
  try {
    const { outfit_id } = req.params;
    const result = await calendarService.getMemoInfo(outfit_id);
    res.status(200).json(new OkSuccess(result, "메모 조회 성공"));
  } catch (err) {
    next(err);
  }
};

// ✏️ 메모/이미지 수정
export const updateOutfit = async (req, res, next) => {
  try {
    const body = req.body || {};
    const text = body.text;
    const file = req.file;

    if ((!text || text.trim() === "") && !file) {
      throw new InvalidInputError("수정할 데이터가 없습니다.");
    }

    const updateData = {};
    if (text && text.trim() !== "") updateData.memo = text;
    if (file) updateData.mainImage = file.filename;

    const result = await calendarService.modifyOutfit(req.params.outfit_id, updateData);
    res.status(200).json(new OkSuccess(result, "코디 수정 성공"));
  } catch (err) {
    next(err);
  }
};

// 🗑 삭제
export const deleteOutfit = async (req, res, next) => {
  try {
    const { outfit_id } = req.params;
    const result = await calendarService.removeOutfit(outfit_id);
    res.status(200).json(new OkSuccess(result, "코디 삭제 성공"));
  } catch (err) {
    next(err);
  }
};

import * as calendarService from './calendar.service.js';
import { OkSuccess } from '../../utils/success.js';
import { InvalidInputError } from '../../utils/error.js';

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

export const getOutfitMemo = async (req, res, next) => {
  try {
    const { outfit_id } = req.params;
    const result = await calendarService.getMemoInfo(outfit_id);
    res.status(200).json(new OkSuccess(result, "메모 조회 성공"));
  } catch (err) {
    next(err);
  }
};

export const updateOutfit = async (req, res, next) => {
  try {
    const body = req.body || {};
    const text = body.text;
    const file = req.file;

    const updateData = {};
    if (text && text.trim() !== "") updateData.memo = text;
    if (file) updateData.mainImage = file.filename;

    const { data, message } = await calendarService.modifyOutfit(req.params.outfit_id, updateData);

    res.status(200).json(new OkSuccess(data, message));
  } catch (err) {
    next(err);
  }
};

export const deleteOutfit = async (req, res, next) => {
  try {
    console.log('🔍 [Controller] DELETE OUTFIT 호출됨');
    console.log('🔍 [Controller] params:', req.params);
    console.log('🔍 [Controller] user:', req.user);
    console.log('🔍 [Controller] headers:', req.headers.authorization);
    
    const { outfit_id } = req.params;
    console.log('🔍 [Controller] outfit_id:', outfit_id, 'type:', typeof outfit_id);
    
    const result = await calendarService.removeOutfit(outfit_id);
    console.log('🔍 [Controller] 삭제 성공:', result);
    
    res.status(200).json(new OkSuccess(result, "코디 삭제 성공"));
  } catch (err) {
    console.error('❌ [Controller] DELETE OUTFIT 에러:', err);
    console.error('❌ [Controller] 에러 스택:', err.stack);
    next(err);
  }
};

export const updateFeelsLikeTemp = async (req, res, next) => {
  try {
    const { outfit_id } = req.params;
    const { feelsLikeTemp } = req.body;

    const parsed = parseFloat(feelsLikeTemp);
    const result = await calendarService.updateFeelsLikeTemp(outfit_id, parsed);
    res.status(200).json(new OkSuccess(result, "체감온도 수정 성공"));
  } catch (err) {
    next(err);
  }
};

// 가장 많이 사용된 스타일 태그 1개 반환
export const getTopStyleTag = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const result = await calendarService.getTopStyleTag(userId);
    res.status(200).json(new OkSuccess(result, "가장 많이 등록한 스타일 태그"));
  } catch (err) {
    next(err);
  }
};

export const getSortedStyleTags = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const result = await calendarService.getSortedStyleTags(userId);
    res.status(200).json(new OkSuccess(result, "스타일 태그 통계 조회 성공"));
  } catch (err) {
    next(err);
  }
};
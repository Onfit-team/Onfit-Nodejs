// src/modules/wardrobe/wardrobe.controller.js
import * as wardrobeService from './wardrobe.service.js';
import { analyzeAndSaveItem } from './wardrobe.service.js';
import { OkSuccess } from '../../utils/success.js';
import { WardrobeFilterDto } from './wardrobe.dto.js';

export const getWardrobeItemsController = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const items = await wardrobeService.getAllWardrobeItems(userId);

    return res.status(200).json(new OkSuccess(items));
  } catch (err) {
    next(err);
  }
};

export const getWardrobeItemDetail = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const userId = req.user.userId;
    const parsedItemId = parseInt(itemId, 10);

    if (!itemId || isNaN(parsedItemId)) {
      return res.status(400).json({ isSuccess: false, message: 'itemId가 올바르지 않습니다.' });
    }

    const item = await wardrobeService.getWardrobeItemDetail(userId, parsedItemId);
    return res.status(200).json(new OkSuccess(item));
  } catch (err) {
    next(err);
  }
};
export const getWardrobeItemsByCategoryController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { category, subcategory } = req.query;

    const items = await wardrobeService.getWardrobeItemsByCategory(
      userId,
      category ? Number(category) : undefined,
      subcategory ? Number(subcategory) : undefined
    );

    return res.status(200).json(new OkSuccess(items));
  } catch (err) {
    next(err);
  }
};

export const getWardrobeItemsByFilterController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const filterDto = new WardrobeFilterDto(req.query);
    const items = await wardrobeService.getWardrobeItemsByFilter(userId, filterDto);
    if (!items || items.length === 0) {
      return res.status(200).json(new OkSuccess([], '해당하는 아이템이 없습니다'));
    }
    return res.status(200).json(new OkSuccess(items));
  } catch (err) {
    next(err);
  }
};

export const uploadWardrobeImage = async (req, res, next) => {
  try {
    const { file, user } = req;
    const result = await analyzeAndSaveItem(file.path, user.userId);

    res.status(200).json({
      isSuccess: true,
      message: "자동 태깅 및 저장 완료",
      result,
    });
  } catch (err) {
    next(err);
  }
};


export const getOutfitsByItemController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { itemId } = req.params;
    const outfits = await wardrobeService.getOutfitsByItem(userId, itemId);
    return res.status(200).json(new OkSuccess(outfits));
  } catch (err) {
    next(err);

export const deleteWardrobeItemController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const itemId = parseInt(req.params.itemId, 10);

    await wardrobeService.softDeleteItem(userId, itemId);

    res.status(200).json(new OkSuccess('아이템이 삭제되었습니다.'));
  } catch (error) {
    next(error);

  }
};

export const getWardrobeBrandsByUserController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const brands = await wardrobeService.getWardrobeBrandsByUser(userId);
    return res.status(200).json(new OkSuccess(brands));
  } catch (err) {
    next(err);
  }
};
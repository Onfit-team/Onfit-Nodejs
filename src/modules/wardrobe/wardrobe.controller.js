// src/modules/wardrobe/wardrobe.controller.js
import * as wardrobeService from './wardrobe.service.js';
import { analyzeAndSaveItem } from './wardrobe.service.js';
import { OkSuccess } from '../../utils/success.js';

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

    const item = await wardrobeService.getWardrobeItemDetail(userId, parseInt(itemId));

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
  }
};
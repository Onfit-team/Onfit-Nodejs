// src/modules/wardrobe/wardrobe.controller.js
import * as wardrobeService from './wardrobe.service.js';
import { OkSuccess, CreatedSuccess } from '../../utils/success.js';
import { TooManyTagsError, NotExistsError} from '../../utils/error.js';
import { WardrobeFilterDto } from './wardrobe.dto.js';

export const getItemCategoryInfo = async (req, res, next) => {
  try {
    const itemId = parseInt(req.params.itemId);
    const userId = req.user.userId;

    const item = await wardrobeService.getItemCategoryInfo(itemId, userId);

    if (!item) {
      throw new NotExistsError('아이템을 찾을 수 없거나 권한이 없습니다.');
    }

    const result = {
      category: item.category,
      subcategory: item.subcategory,
      season: item.season,
      color: item.color
    };

    res.json(new OkSuccess(result, "아이템 분류 정보 조회 성공"));
  } catch (err) {
    next(err);
  }
};

export const createItem = async (req, res, next) => {
  try {
    const userId = req.user.userId; // JWT 인증 미들웨어로부터
    const itemData = req.body;

    const tagIds = itemData.tagIds || [];

    // 태그 분류 (1~9: mood, 10~17: purpose)
    const moodTags = tagIds.filter(id => id >= 1 && id <= 9);
    const purposeTags = tagIds.filter(id => id >= 10 && id <= 17);

    if (moodTags.length > 3 || purposeTags.length > 3) {
      throw new TooManyTagsError();
    }

    const itemId = await wardrobeService.createItem(userId, itemData);
    return res.status(201).json(new CreatedSuccess({ itemId }, "아이템이 성공적으로 등록되었습니다."));
  } catch (err) {
    next(err);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const itemId = parseInt(req.params.itemId);
    const userId = req.user.userId;
    const itemData = req.body;

    const tagIds = itemData.tagIds || [];

    // 태그 분류
    const moodTags = tagIds.filter(id => id >= 1 && id <= 9);
    const purposeTags = tagIds.filter(id => id >= 10 && id <= 17);

    if (moodTags.length > 3 || purposeTags.length > 3) {
      throw new TooManyTagsError();
    }

    const result = await wardrobeService.updateItem(itemId, userId, itemData);
    return res.status(200).json(new OkSuccess({ itemId: result.id }, "아이템 정보가 성공적으로 수정되었습니다."));
  } catch (err) {
    next(err);
  }
};


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

export const getItemOutfitHistoryController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { itemId } = req.params;
    
    // itemId 유효성 검사
    const parsedItemId = parseInt(itemId, 10);
    if (!itemId || isNaN(parsedItemId)) {
      return res.status(400).json({ 
        isSuccess: false, 
        message: 'itemId가 올바르지 않습니다.' 
      });
    }

    const outfits = await wardrobeService.getItemOutfitHistory(userId, parsedItemId);
    
    // 결과가 없을 때 메시지 추가
    if (!outfits || outfits.length === 0) {
      return res.status(200).json(new OkSuccess([], '해당 아이템이 포함된 아웃핏이 없습니다.'));
    }

    return res.status(200).json(new OkSuccess(outfits, '아이템이 포함된 코디 기록 조회 성공'));
  } catch (err) {
    next(err);
  }
};

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

export const autoClassifyItem = async (req, res, next) => {
  try {
    const image = req.file;
    const { prompt } = req.body;

    if (!image) {
      return res.status(400).json({
        isSuccess: false,
        code: 'NO_IMAGE',
        message: '이미지가 필요합니다.',
      });
    }

    const result = await wardrobeService.autoClassifyItem(image.path, prompt);

    res.status(200).json({
      isSuccess: true,
      code: 'AUTO200',
      message: '이미지 분석이 완료되었습니다.',
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const getRecommendedCoordinatedItemsController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { itemId } = req.params;
    const parsedItemId = parseInt(itemId, 10);

    if (!itemId || isNaN(parsedItemId)) {
      return res.status(400).json({
        isSuccess: false,
        message: 'itemId가 올바르지 않습니다.'
      });
    }

    const recommendedItems = await wardrobeService.getRecommendedCoordinatedItems(userId, parsedItemId);
    
    if (!recommendedItems || recommendedItems.length === 0) {
      return res.status(200).json(new OkSuccess([], '추천할 수 있는 아이템이 없습니다'));
    }

    return res.status(200).json(new OkSuccess(recommendedItems, '코디 추천 아이템 조회 성공'));
  } catch (err) {
    if (err.message === '해당 아이템을 찾을 수 없습니다.') {
      return res.status(404).json({
        isSuccess: false,
        message: err.message
      });
    }
    next(err);
  }
};
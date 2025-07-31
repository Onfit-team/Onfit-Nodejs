//src/modules/wardrobe/wardrobe.service.js
//import openai from './openai.js';
import { analyzeImage } from './openai.js';
import { PrismaClient } from '@prisma/client';
import * as wardrobeRepo from './wardrobe.repository.js';
//import { wardrobeRepository } from './wardrobe.repository.js';
import { CustomError } from '../../utils/error.js';
import fs from 'fs';

const prisma = new PrismaClient();
export const createItem = async (userId, data) => {
  const {
    category,
    subcategory,
    season,
    color,
    brand,
    size,
    purchaseDate,
    image,
    price,
    purchaseSite,
    tagIds = []
  } = data;

  const item = await wardrobeRepo.createItem({
    userId,
    category,
    subcategory,
    season,
    color,
    brand,
    size,
    purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
    image,
    price,
    purchaseSite
  });

  if (tagIds.length > 0) {
    await wardrobeRepo.createItemTags(item.id, tagIds);
  }

  return item.id;
};

export const getAllWardrobeItems = async (userId) => {
  return await prisma.item.findMany({
    where: {
      userId: userId,
      isDeleted: false,
    },
    select: {
      id: true,
      image: true,
    },
    orderBy: {
      id: 'desc',
    },
  });
};

export const getWardrobeItemDetail = async (userId, itemId) => {
  
  const item = await prisma.item.findFirst({
    
    where: {
      id: itemId,
      userId,
      isDeleted: false,
    },
    select: {
      id: true,
      category: true,
      subcategory: true,
      brand: true,
      color: true,
      size: true,
      season: true,
      purchaseDate: true,
      image: true,
    },
  });

  if (!item) {
    throw new CustomError('해당 아이템을 찾을 수 없습니다.', 404, 'NOT_FOUND');
  }
  return item;
};

export const getWardrobeItemsByCategory = async (userId, category, subcategory, itemId) => {
  const where = {
    userId,
    isDeleted: false,
    ...(category !== undefined && category !== null && { category }),
    ...(subcategory !== undefined && subcategory !== null && { subcategory }),
    ...(itemId !== undefined && itemId !== null && { id: itemId }), // ✅ itemId 있을 때만
  };

  return await prisma.item.findMany({
    where,
    select: {
      id: true,
      image: true,
    },
    orderBy: {
      id: 'desc',
    },
  });
};

export const getItemOutfitHistory = async (userId, itemId) => {
  // itemId 유효성 검사
  const parsedItemId = Number(itemId);
  if (isNaN(parsedItemId)) {
    throw new Error('유효하지 않은 itemId입니다.');
  }

  return await prisma.outfit.findMany({
    where: {
      userId,
      outfitItems: {
        some: { itemId: parsedItemId }
      }
    },
    orderBy: { id: 'desc' },
    include: {
      outfitItems: {
        include: { 
          item: {
            select: {
              id: true,
              category: true,
              subcategory: true,
              brand: true,
              color: true,
              size: true,
              season: true,
              image: true
            }
          }
        }
      },
      outfitTags: {
        include: { 
          tag: {
            select: {
              id: true,
              name: true,
              type: true
            }
          }
        }
      },
      outfitLikes: true,
      user: {
        select: {
          id: true,
          nickname: true,
          profileImage: true
        }
      }
    }
  });
};

export const getWardrobeItemsByFilter = async (userId, filterDto) => {
  const { season, color, brand, tagIds } = filterDto;
  const where = {
    userId,
    isDeleted: false,
    ...(season !== undefined && { season }),
    ...(color !== undefined && { color }),
    ...(brand !== undefined && { brand }),
  };

  // 태그 필터: tagIds 중 하나라도 포함된 아이템
  if (tagIds && tagIds.length > 0) {
    return await prisma.item.findMany({
      where: {
        ...where,
        itemTags: {
          some: {
            tagId: { in: tagIds },
          },
        },
      },
      orderBy: { id: 'desc' },
    });
  }

  // 태그 필터 없으면 일반 조건만
  return await prisma.item.findMany({
    where,
    orderBy: { id: 'desc' },
  });
};

export const softDeleteItem = async (userId, itemId) => {
  const item = await prisma.item.findUnique({
    where: { id: itemId },
  });

  if (!item || item.isDeleted || item.userId !== userId) {
    throw new CustomError(errorCode.NOT_FOUND, '삭제할 아이템이 없거나 권한이 없습니다.');
  }

  await prisma.item.update({
    where: { id: itemId },
    data: { isDeleted: true },
  });
};

export const getWardrobeBrandsByUser = async (userId) => {
  const brands = await prisma.item.findMany({
    where: {
      userId,
      isDeleted: false,
      brand: { not: null },
    },
    select: { brand: true },
    orderBy: { id: 'desc' },
    distinct: ['brand'],
  });
  return brands.map(b => b.brand);
};

export const autoClassifyItem = async (imagePath, prompt) => {
  const result = await analyzeImage(imagePath, prompt);
  return result; // { category, subcategory, season, color }
};

export const updateItem = async (itemId, userId, itemData) => {
  // 아이템 존재 및 소유자 확인
  const existingItem = await wardrobeRepo.findItemByItemId(itemId, userId);
  if (!existingItem || existingItem.userId !== userId) {
    const error = new Error('아이템을 찾을 수 없거나 권한이 없습니다.');
    error.status = 404;
    throw error;
  }
  // 날짜 변환
  if (itemData.purchaseDate) {
    itemData.purchaseDate = new Date(itemData.purchaseDate);
  }

  // 태그 업데이트: 기존 태그 제거 후 재등록
  if (itemData.tagIds) {
    await wardrobeRepo.clearItemTags(itemId);
    await wardrobeRepo.createItemTags(itemId, itemData.tagIds);
  }

  // 나머지 필드 업데이트
  return await wardrobeRepo.updateItem(itemId, itemData);
};

export const getItemCategoryInfo = async (itemId, userId) => {
  return await wardrobeRepo.findItemCategoryById(itemId, userId);
};
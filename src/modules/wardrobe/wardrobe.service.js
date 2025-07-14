import { PrismaClient } from '@prisma/client';
import * as wardrobeRepository from './wardrobe.repository.js';
import { CustomError } from '../../utils/error.js';
const prisma = new PrismaClient();

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


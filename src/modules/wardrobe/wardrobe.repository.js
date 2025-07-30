import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const findItemById = async (userId, itemId) => {
  return await prisma.item.findFirst({
    where: {
      id: itemId,
      userId: userId,
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
};

export const createItem = async (data) => {
  return await prisma.item.create({ data });
};

export const createItemTags = async (itemId, tagIds) => {
  const itemTags = tagIds.map((tagId) => ({
    itemId,
    tagId,
  }));

  return await prisma.itemTag.createMany({ data: itemTags });
};

// 아이템 수정
export const updateItem = async (itemId, data) => {
  const { tagIds, ...updateFields } = data;

  return await prisma.item.update({
    where: { id: parseInt(itemId) },
    data: updateFields,
  });
};

// 기존 태그 삭제
export const clearItemTags = async (itemId) => {
  return await prisma.itemTag.deleteMany({
    where: { itemId: parseInt(itemId) },
  });
};


export const findItemByItemId = async (itemId, userId) => {
  return await prisma.item.findFirst({
    where: {
      id: itemId,
      userId,
      isDeleted: false,
    },
    select: {
      id: true,
      userId: true,
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
};

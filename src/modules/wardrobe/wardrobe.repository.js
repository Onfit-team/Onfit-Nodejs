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

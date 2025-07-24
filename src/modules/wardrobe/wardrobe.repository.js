//src/modules/wardrobe/wardrobe.repository.js
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

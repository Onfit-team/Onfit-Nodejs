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

// export const wardrobeRepository = {
//   createItem: (data) =>
//     prisma.item.create({
//       data,
//     }),
// };

export const wardrobeRepository = {
  createItem: async (data) => {
    const requiredFields = ['userId', 'category', 'subcategory', 'color', 'season'];

    console.log('📦 Item 저장 시도:', data);

    const missing = requiredFields.filter((key) => data[key] === undefined || data[key] === null);

    if (missing.length > 0) {
      console.error('❌ 누락된 필수 필드:', missing);
      throw new Error(`다음 필드가 누락됨: ${missing.join(', ')}`);
    }

    return await prisma.item.create({
      data,
    });
  },
};
import { PrismaClient } from '@prisma/client';
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

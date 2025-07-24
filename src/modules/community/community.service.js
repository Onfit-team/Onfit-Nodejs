//src/modules/community/community.service.js

import { PrismaClient } from '@prisma/client';
import { CustomError } from '../../utils/error.js';
const prisma = new PrismaClient();

export const toggleOutfitLike = async (userId, outfitId) => {
  const existing = await prisma.outfitLike.findFirst({
    where: { userId, outfitId },
  });

  if (existing) {
    // 좋아요 취소
    await prisma.outfitLike.delete({
      where: { id: existing.id },
    });
    return { liked: false, message: '좋아요 취소됨' };
  } else {
    // 좋아요 추가
    await prisma.outfitLike.create({
      data: { userId, outfitId },
    });
    return { liked: true, message: '좋아요 추가됨' };
  }
};

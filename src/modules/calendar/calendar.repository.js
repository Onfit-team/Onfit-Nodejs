import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const calendarRepository = {
  // Outfit 하나 조회
  async findById(id) {
    return await prisma.outfit.findUnique({
      where: { id: parseInt(id) }
    });
  },

  // Outfit 존재 확인
  async existsById(id) {
    const outfit = await prisma.outfit.findUnique({
      where: { id: parseInt(id) }
    });
    return outfit !== null;
  },

  // Outfit 업데이트
  async updateById(id, data) {
    return await prisma.outfit.update({
      where: { id: parseInt(id) },
      data
    });
  },

  // Outfit 삭제
  async deleteById(id) {
    return await prisma.outfit.delete({
      where: { id: parseInt(id) }
    });
  }
};

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const userRepository = {
  async findByEmail(email) {
    return await prisma.user.findUnique({ where: { email } });
  },
  async create(data) {
    return await prisma.user.create({ data });
  },
   async updateNickname(userId, nickname) {
    return await prisma.user.update({
      where: { id: userId },
      data: { nickname }
    });
  }
};

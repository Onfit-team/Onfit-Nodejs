import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const itemRepository = {
  async findById(id) {
    return await prisma.item.findUnique({ where: { id: parseInt(id) } });
  },
  async existsById(id) {
    return await prisma.item.findUnique({ where: { id: parseInt(id) } }) !== null;
  },
  async create(data) {
    const { userId, ...rest } = data;
    return await prisma.item.create({
      data: {
        ...rest,
        user: { connect: { id: userId } }
      }
    });
  },
  async updateById(id, data) {
    return await prisma.item.update({ where: { id: parseInt(id) }, data });
  },
  async deleteById(id) {
    return await prisma.item.delete({ where: { id: parseInt(id) } });
  }
};
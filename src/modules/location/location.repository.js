import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findLocationByCode = async (code) => {
  return await prisma.location.findUnique({ where: { code } });
};

export const createLocation = async (sido, sigungu, dong, code) => {
  return await prisma.location.create({
    data: { sido, sigungu, dong, code },
  });
};

export const updateUserLocation = async (userId, locationId) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { locationId },
    include: { location: true },
  });
};


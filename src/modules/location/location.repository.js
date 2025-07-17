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

export const findUserWithLocation = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      location: true,
    },
  });
};

export const setUserLocationByCode = async (userId, locationData) => {
  let location = null;

  // ✅ code가 있을 때만 중복 조회
  if (locationData.code) {
    location = await findLocationByCode(locationData.code);
  }

  // ✅ code가 없거나, 조회 결과 없으면 새로 생성
  if (!location) {
    location = await createLocation(
      locationData.sido,
      locationData.sigungu,
      locationData.dong,
      locationData.code || null // 저장은 null 가능
    );
  }

  const user = await updateUserLocation(userId, location.id);
  return user.location;
};

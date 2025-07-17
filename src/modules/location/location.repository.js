import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findLocationByCode = async (code) => {
  return await prisma.location.findUnique({ where: { code } });
};

export const findLocationByRegion = async (sido, sigungu, dong) => {
  return await prisma.location.findFirst({
    where: {
      sido,
      sigungu,
      dong,
      code: null, // 코드 없는 것 중에서만
    },
  });
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

  // 1. code로 찾기
  if (locationData.code) {
    location = await findLocationByCode(locationData.code);
  } else {
    // 2. code 없을 경우 sido+sigungu+dong 기준으로 찾기
    location = await findLocationByRegion(
      locationData.sido,
      locationData.sigungu,
      locationData.dong
    );
  }

  // 3. code가 없거나, 조회 결과 없으면 새로 생성
  if (!location) {
    location = await createLocation(
      locationData.sido,
      locationData.sigungu,
      locationData.dong,
      locationData.code || null // 저장은 null 가능
    );
  }
  // 4. 사용자 정보에 locationId 연결
  const user = await updateUserLocation(userId, location.id);
  return user.location;
};

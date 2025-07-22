import { PrismaClient } from '@prisma/client';
import { findUserWithLocation } from '../location/location.repository.js';
import { getCurrentWeatherByUserId } from '../weather/weather.service.js';
import { UserLocationNotFoundError, WeatherApiError } from '../../utils/error.js';

const prisma = new PrismaClient();

// 실제 위치 API 호출로 수정
async function getCurrentLocation(userId) {
  const userWithLocation = await findUserWithLocation(userId);
  
  if (!userWithLocation || !userWithLocation.location) {
    throw new UserLocationNotFoundError('사용자의 위치 정보가 설정되지 않았습니다.');
  }

  const location = userWithLocation.location;
  return {
    id: location.id,
    name: `${location.sido} ${location.sigungu} ${location.dong}`,
    sido: location.sido,
    sigungu: location.sigungu,
    dong: location.dong,
    latitude: location.latitude,
    longitude: location.longitude
  };
}

// 실제 날씨 API 호출로 수정
async function getCurrentWeather(userId) {
  try {
    const weatherData = await getCurrentWeatherByUserId(userId);
    return {
      tempAvg: weatherData.weather.tempAvg,
      tempMin: weatherData.weather.tempMin,
      tempMax: weatherData.weather.tempMax,
      feelsLike: weatherData.weather.feelsLike,
      status: weatherData.weather.status,
      precipitation: weatherData.weather.precipitation
    };
  } catch (error) {
    throw new WeatherApiError('현재 날씨 정보를 가져올 수 없습니다.');
  }
}

export async function getSimilarTemperatureOutfits(userId, tempRange = 2) {
  try {
    // 1. 현재 날씨 정보 가져오기
    const currentWeather = await getCurrentWeather(userId);
    const targetTemp = currentWeather.tempAvg;
    
    // 2. ±2도 범위 내의 과거 outfit 기록 조회 
    const similarOutfits = await prisma.outfit.findMany({
      where: {
        userId: userId,
        weatherTempAvg: {
          gte: targetTemp - tempRange,
          lte: targetTemp + tempRange
        }
      },
      select: {
        id: true,
        feelsLikeTemp: true,  
        mainImage: true        // outfit 이미지
      },
      orderBy: {
        date: 'desc'
      },
      take: 10  // 최대 10개
    });

    // 간소화된 응답 - 체감온도와 이미지만
    return {
      currentTemp: currentWeather.tempAvg,
      outfits: similarOutfits.map(outfit => ({
        id: outfit.id,
        feelsLikeTemp: outfit.feelsLikeTemp,  // 체감온도
        image: outfit.mainImage                // outfit 이미지
      }))
    };
  } catch (error) {
    if (error instanceof UserLocationNotFoundError || error instanceof WeatherApiError) {
      throw error;
    }
    throw new Error('비슷한 온도의 옷차림 기록을 가져오는데 실패했습니다.');
  }
}


export function getFeelsLikeTempOptions() {
  return [
    { id: 1, name: "많이 추움" },
    { id: 2, name: "조금 추움" },
    { id: 3, name: "딱 좋음" },
    { id: 4, name: "조금 더움" },
    { id: 5, name: "많이 더움" }
  ];
}

export async function getMoodTags() {
  const moodTags = await prisma.tag.findMany({
    where: { type: 'mood' },
    orderBy: { id: 'asc' },
    select: { id: true, name: true }
  });
  return moodTags;
}

export async function getPurposeTags() {
  const purposeTags = await prisma.tag.findMany({
    where: { type: 'purpose' },
    orderBy: { id: 'asc' },
    select: { id: true, name: true }
  });
  return purposeTags;
}

export async function getAllTags() {
  const [moodTags, purposeTags] = await Promise.all([
    getMoodTags(),
    getPurposeTags()
  ]);

  return {
    mood: moodTags,
    purpose: purposeTags
  };
}

// 실제 DB 저장 로직으로 완성
export async function createOutfit(outfitData) {
  const { 
    userId,           //userId 파라미터 추가
    date, 
    mainImage, 
    memo = null,
    feelsLikeTemp = null,  // 사용자가 입력한 실제 체감온도
    moodTags = [],
    purposeTags = []
  } = outfitData;
  
// 해당 날짜에 이미 등록된 outfit이 있는지 확인
  const inputDate = new Date(date);
  const startOfDay = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate(), 0, 0, 0, 0);
  const endOfDay = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate(), 23, 59, 59, 999);

  const existingOutfit = await prisma.outfit.findFirst({
    where: {
      userId,
      date: {
        gte: startOfDay,
        lte: endOfDay
      }
    }
  });

  if (existingOutfit) {
    throw new Error('이미 해당 날짜에 등록된 코디가 있습니다. 하루에 하나의 코디만 등록할 수 있습니다.');
  }

  // 1. 위치 정보 가져오기
  const location = await getCurrentLocation(userId);
  
  // 2. 현재 날씨 정보 가져오기
  const weather = await getCurrentWeather(userId);
  
  // 3. 실제 DB에 outfit 저장
  const outfit = await prisma.outfit.create({
    data: {
      userId: userId,
      locationId: location.id,
      date: inputDate,
      weatherTempAvg: weather.tempAvg,        // 실제 날씨 온도
      feelsLikeTemp: feelsLikeTemp,           // 사용자가 입력한 체감온도
      mainImage,
      memo
    }
  });
  
  // 4. 태그 연결
  const allTagIds = [...moodTags, ...purposeTags];
  if (allTagIds.length > 0) {
    await prisma.outfitTag.createMany({
      data: allTagIds.map(tagId => ({
        outfitId: outfit.id,
        tagId
      }))
    });
  }
  
  // 5. 생성된 outfit과 태그 정보 함께 반환
  return {
    ...outfit,
    moodTags,
    purposeTags
  };
}

export async function getUserRecent7DaysOutfits(userId) {
  // 7일 전 시작일과 오늘 종료일 계산
  const to   = new Date(); to.setHours(23,59,59,999);
  const from = new Date(); from.setDate(from.getDate() - 6);
                       from.setHours(0,0,0,0);

  // DB에서 조회
  const outfits = await prisma.outfit.findMany({
    where: {
      userId,
      date: { gte: from, lte: to }
    },
    select: {
      date: true,
      mainImage: true
    },
    orderBy: { date: 'desc' }
  });

  // 사용자 정보
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { nickname: true }
  });

  return {
    userName: user.nickname,
    outfits: outfits.map(o => ({
      date: o.date.toISOString().split('T')[0],  // YYYY-MM-DD
      image: o.mainImage
    }))
  };
}
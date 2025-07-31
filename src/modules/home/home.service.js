import {
  getSimilarTemperatureOutfits,
  getUserRecent7DaysOutfits
} from '../outfit/outfit.service.js';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import {getCurrentWeatherByUserId} from '../weather/weather.service.js';

const TEMP_CATEGORY_CODE_MAP = [
  { min: 28, max: 100, pairs: [ [1,1], [1,3], [2,1], [5,3], [5,4], [2,6] ] }, // 반팔, 민소매, 반바지, 샌들, 슬리퍼, 스커트
  { min: 23, max: 27, pairs: [ [1,1], [1,3], [1,4], [2,1], [3,1], [5,1], [2,6] ] },
  { min: 20, max: 22, pairs: [ [1,4], [1,2], [3,1], [2,2], [2,6], [1,5], [5,1], [1,10] ] },
  { min: 17, max: 19, pairs: [ [1,2], [1,5], [1,6], [1,7], [4,3], [2,2], [2,6], [5,1], [5,6] ] },
  { min: 13, max: 16, pairs: [ [1,7], [4,3], [1,10], [2,3], [3,1], [2,4], [5,6] ] },
  { min: 8,  max: 12, pairs: [ [1,7], [4,4], [4,3], [4,6], [2,3], [5,2], [6,2] ] },
  { min: 4,  max: 7,  pairs: [ [4,4], [4,5], [1,7], [4,6], [4,7], [6,3], [6,2], [5,2] ] },
  { min: 0,  max: 3,  pairs: [ [4,5], [4,7], [1,7], [4,4], [6,3], [6,2], [5,2], [6,7] ] },
  { min: -100, max: -1, pairs: [ [4,5], [1,7], [4,7], [6,3], [6,2], [5,2], [2,4] ] }
];

function getRecommendedPairs(avgTemp) {
  return (
    TEMP_CATEGORY_CODE_MAP.find(row => avgTemp >= row.min && avgTemp <= row.max)?.pairs || []
  );
}

export function getCurrentDate() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/** 홈: 현재 온도 기준 ±2℃ 비슷한 아웃핏 */
export async function getHomeSimilarOutfits(userId) {
  return await getSimilarTemperatureOutfits(userId);
}

/** 홈: 지난 7일간 아웃핏 */
export async function getHomeRecentOutfits(userId) {
  return await getUserRecent7DaysOutfits(userId);
}

export const getHomeRecommendItems = async (userId) => {
  // 1. 오늘 날씨 정보 (평균, 최고, 최저)
  const todayWeather = await getCurrentWeatherByUserId(userId);
  const averageTemp = todayWeather?.weather?.tempAvg;
  if (typeof averageTemp !== 'number') {
    throw new Error('오늘 평균기온을 조회할 수 없습니다.');
  }

  // 2. 추천 category/subcategory 코드 쌍 구하기
  const codePairs = getRecommendedPairs(averageTemp);
  if (codePairs.length === 0) return [];

  // 3. 랜덤 셔플
  const pairs = codePairs.sort(() => 0.5 - Math.random());

  // 4. 각 쌍별로 내 아이템 1개 찾기
  const itemPromises = pairs.map(([category, subcategory]) =>
    prisma.item.findFirst({
      where: { userId, category, subcategory, image: { not: null } },
      select: { id: true, image: true, category: true, subcategory: true }
    })
  );
  const found = (await Promise.all(itemPromises)).filter(Boolean);

  // 5. 대분류별로 다르게: 3개만
  const usedMainTypes = new Set();
  const selected = [];
  for (const item of found) {
    if (!usedMainTypes.has(item.category)) {
      selected.push(item);
      usedMainTypes.add(item.category);
      if (selected.length >= 3) break;
    }
  }
  while (selected.length < 3 && found.length > selected.length) {
    const extra = found.find(i => !selected.some(sel => sel.id === i.id));
    if (extra) selected.push(extra);
  }

  let diurnalMsg;
  if (
    todayWeather?.weather?.tempMax != null &&
    todayWeather?.weather?.tempMin != null &&
    todayWeather.weather.tempMax - todayWeather.weather.tempMin >= 8
  ) {
    diurnalMsg = "오늘은 일교차가 커요, 겉옷 꼭 챙기세요!";
  }

  return {
    averageTemp,
    items: selected,
    diurnalMsg
  };
};
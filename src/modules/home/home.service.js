import {
  getSimilarTemperatureOutfits,
  getUserRecent7DaysOutfits
} from '../outfit/outfit.service.js';

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
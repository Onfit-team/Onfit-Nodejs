import { InvalidInputError } from "../../utils/error.js";

export const validateSearchQuery = (q) => {
  if (!q || typeof q !== "string" || q.trim() === "") {
    throw new InvalidInputError("검색어를 입력해주세요.");
  }
  return q.trim();
};

export const toLocationResponseDto = (userId, location) => {
  return {
    userId,
    location: {
      sido: location.sido,
      sigungu: location.sigungu,
      dong: location.dong,
      code: location.code,
    },
  };
};
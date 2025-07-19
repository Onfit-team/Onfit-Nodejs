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

export class LocationDTO {
  constructor(location) {
    this.sido = location.sido;
    this.sigungu = location.sigungu;
    this.dong = location.dong;
    this.code = location.code;
  }
}

export const validateCoordinates = ({ latitude, longitude }) => {
  if (
    typeof latitude !== "number" ||
    typeof longitude !== "number" ||
    isNaN(latitude) ||
    isNaN(longitude)
  ) {
    throw new InvalidInputError("위도 또는 경도 값이 유효하지 않습니다.");
  }

  return { latitude, longitude };
};

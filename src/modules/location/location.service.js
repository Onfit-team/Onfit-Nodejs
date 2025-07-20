import axios from "axios";
import dotenv from "dotenv";
import { NotExistsError, AlreadyExistsError, LocationNotFoundError } from "../../utils/error.js";
import { PrismaClient } from '@prisma/client';
import { LocationDTO, validateCoordinates } from "./location.dto.js";
import { findUserWithLocation, setUserLocationByCode } from "./location.repository.js";

const prisma = new PrismaClient();
dotenv.config();
const KAKAO_KEY = process.env.KAKAO_CLIENT_ID;

export const searchLocationService = async (query) => {
  const url = "https://dapi.kakao.com/v2/local/search/address.json";
  const res = await axios.get(url, {
    params: { query },
    headers: { Authorization: `KakaoAK ${KAKAO_KEY}` },
  });
  const docs = res.data.documents;
  if (!docs || docs.length === 0) {
    throw new NotExistsError("해당 지역을 찾을 수 없습니다.");
  }
  return docs.map((d) => ({
    sido: d.address.region_1depth_name,
    sigungu: d.address.region_2depth_name,
    dong: d.address.region_3depth_name,
    code: d.address.h_code, // 행정동 코드
    address_name: d.address.address_name,
    x: d.x,
    y: d.y,
  }));
};

export const saveLocationService = async (userId, query) => {
  if (!query) {
    throw new InvalidInputError("주소 검색어(query)가 누락되었습니다.");
  }

  // 1. 카카오맵 API 요청으로 주소 정보 가져오기
  const kakaoRes = await axios.get('https://dapi.kakao.com/v2/local/search/address.json', {
    headers: {
      Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`
    },
    params: { query }
  });

  const documents = kakaoRes.data.documents;
  if (!documents || documents.length === 0) {
    throw new NotExistsError("주소 결과가 없습니다.", { query });
  }

  //const address = documents[0].address;
   // ✅ document 대신 다른 변수명 사용
  const firstDocument = documents[0];
  const address = firstDocument.address;
  const code = address.b_code || address.h_code || address.region_3depth_h_code;

  if (!code) {
    throw new NotExistsError("법정동 코드가 없습니다.", { address });
  }

   // ✅ 변수명 변경
  const latitude = parseFloat(firstDocument.y);
  const longitude = parseFloat(firstDocument.x);


  // 2. DB에 이미 있는지 확인, 없으면 저장
  let location = await prisma.location.findUnique({ where: { code } });

  if (!location) {
    location = await prisma.location.create({
      data: {
        sido: address.region_1depth_name,
        sigungu: address.region_2depth_name,
        dong: address.region_3depth_name,
        code,
        latitude,
        longitude
      }
    });
  }

  // 3. 이미 저장된 경우 예외 처리
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (user?.locationId === location.id) {
    throw new AlreadyExistsError("이미 저장된 위치입니다.", { code });
  }

  // 4. 유저 정보에 위치 연결
  await prisma.user.update({
    where: { id: userId },
    data: { locationId: location.id }
  });

  return {
    userId,
    location: {
      sido: location.sido,
      sigungu: location.sigungu,
      dong: location.dong,
      code: location.code
    }
  };

};

export const getMyLocationService = async (userId) => {
  const user = await findUserWithLocation(userId);

  if (!user?.location) {
    throw new NotExistsError("사용자 위치가 설정되어 있지 않습니다.", { userId });
  }

  return new LocationDTO(user.location);
};

export const saveCurrentLocationService = async (userId, lat, lng) => {
  const { latitude, longitude } = validateCoordinates({ latitude: lat, longitude: lng });

  // 1. 좌표 → 주소 변환 (카카오 Reverse Geocoding)
  const kakaoRes = await axios.get("https://dapi.kakao.com/v2/local/geo/coord2address.json", {
    headers: {
      Authorization: `KakaoAK ${KAKAO_KEY}`,
    },
    params: { x: longitude, y: latitude },
  });

  const documents = kakaoRes.data.documents;
  if (!documents || documents.length === 0) {
    throw new LocationNotFoundError(undefined, { latitude, longitude });
  }

  const address = documents[0].address;

  const code = 
    address.b_code || 
    address.h_code || 
    address.region_3depth_h_code || 
    null;

  const location = await setUserLocationByCode(userId, {
    sido: address.region_1depth_name,
    sigungu: address.region_2depth_name,
    dong: address.region_3depth_name,
    code,
    latitude,
    longitude
  });

  return {
    userId,
    location: {
      sido: location.sido,
      sigungu: location.sigungu,
      dong: location.dong,
      code: location.code ?? null,
    },
  };
};
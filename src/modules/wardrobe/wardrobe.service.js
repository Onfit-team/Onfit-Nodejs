//src/modules/wardrobe/wardrobe.service.js
//import openai from './openai.js';
import { analyzeImage } from './openai.js';
import { PrismaClient } from '@prisma/client';
import * as wardrobeRepo from './wardrobe.repository.js';
//import { wardrobeRepository } from './wardrobe.repository.js';
import { CustomError } from '../../utils/error.js';
import fs from 'fs';

const prisma = new PrismaClient();
export const createItem = async (userId, data) => {
  const {
    category,
    subcategory,
    season,
    color,
    brand,
    size,
    purchaseDate,
    image,
    price,
    purchaseSite,
    tagIds = []
  } = data;

  const item = await wardrobeRepo.createItem({
    userId,
    category,
    subcategory,
    season,
    color,
    brand,
    size,
    purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
    image,
    price,
    purchaseSite
  });

  if (tagIds.length > 0) {
    await wardrobeRepo.createItemTags(item.id, tagIds);
  }

  return item.id;
};

export const getAllWardrobeItems = async (userId) => {
  // 1. 카테고리별 통계 조회 (등록 수 많은 순)
  const categoryStats = await prisma.item.groupBy({
    by: ['category'],
    where: {
      userId,
      isDeleted: false,
    },
    _count: {
      category: true,
    },
    orderBy: {
      _count: {
        category: 'desc',
      },
    },
  });

  // 2. 전체 아이템 조회
  const items = await prisma.item.findMany({
    where: {
      userId,
      isDeleted: false,
    },
    select: {
      id: true,
      image: true,
    },
    orderBy: {
      id: 'desc',
    },
  });

  // 3. 카테고리 이름 매핑
  const categoryMap = {
    1: '상의', 2: '하의', 3: '원피스', 
    4: '아우터', 5: '신발', 6: '액세서리'
  };

  // 4. 카테고리 통계 구성
  const categories = categoryStats.map(stat => ({
    category: stat.category,
    name: categoryMap[stat.category],
    count: stat._count.category,
  }));

  // 5. 전체 개수 계산
  const totalCount = items.length;

  return {
    totalCount,
    categories,
    items,
    appliedFilter: null // 필터 미적용 상태
  };
};

export const getWardrobeItemDetail = async (userId, itemId) => {
  
  const item = await prisma.item.findFirst({
    
    where: {
      id: itemId,
      userId,
      isDeleted: false,
    },
    select: {
      id: true,
      category: true,
      subcategory: true,
      brand: true,
      color: true,
      size: true,
      season: true,
      purchaseDate: true,
      image: true,
    },
  });

  if (!item) {
    throw new CustomError('해당 아이템을 찾을 수 없습니다.', 404, 'NOT_FOUND');
  }
  return item;
};

export const getWardrobeItemsByCategory = async (userId, category, subcategory, itemId) => {
  // 1. 전체 카테고리 통계 (항상 표시)
  const categoryStats = await prisma.item.groupBy({
    by: ['category'],
    where: {
      userId,
      isDeleted: false,
    },
    _count: {
      category: true,
    },
    orderBy: {
      _count: {
        category: 'desc',
      },
    },
  });

  // 2. 필터된 아이템 조회
  const where = {
    userId,
    isDeleted: false,
    ...(category !== undefined && category !== null && { category }),
    ...(subcategory !== undefined && subcategory !== null && { subcategory }),
    ...(itemId !== undefined && itemId !== null && { id: itemId }),
  };

  const items = await prisma.item.findMany({
    where,
    select: {
      id: true,
      image: true,
    },
    orderBy: {
      id: 'desc',
    },
  });

  // 3. 카테고리 이름 매핑
  const categoryMap = {
    1: '상의', 2: '하의', 3: '원피스', 
    4: '아우터', 5: '신발', 6: '액세서리'
  };

  const subcategoryMap = {
    1: { // 상의
      1: '반팔티셔츠', 2: '긴팔티셔츠', 3: '맨투맨/후드', 4: '셔츠/블라우스',
      5: '니트/스웨터', 6: '조끼/베스트', 7: '민소매', 8: '기타'
    },
    2: { // 하의
      1: '반바지', 2: '긴바지', 3: '청바지', 4: '슬랙스',
      5: '레깅스', 6: '스커트', 7: '기타'
    },
    3: { // 원피스
      1: '미니원피스', 2: '미디원피스', 3: '롱원피스', 4: '기타'
    },
    4: { // 아우터
      1: '카디건', 2: '코트', 3: '자켓', 4: '점퍼/짚업',
      5: '패딩', 6: '기타'
    },
    5: { // 신발
      1: '운동화', 2: '부츠', 3: '샌들', 4: '구두',
      5: '슬리퍼', 6: '기타'
    },
    6: { // 액세서리
      1: '모자', 2: '스카프', 3: '벨트', 4: '시계',
      5: '액세서리', 6: '가방', 7: '기타'
    }
  };

  // 4. 카테고리 통계 구성
  const categories = categoryStats.map(stat => ({
    category: stat.category,
    name: categoryMap[stat.category],
    count: stat._count.category,
  }));

  // 5. 하위카테고리 목록 구성 (상위카테고리 선택 시)
  let subcategories = [];
  if (category && !subcategory) {
    // 해당 카테고리의 하위카테고리 조회
    const subcategoryStats = await prisma.item.groupBy({
      by: ['subcategory'],
      where: {
        userId,
        isDeleted: false,
        category: category,
      },
      _count: {
        subcategory: true,
      },
      orderBy: {
        subcategory: 'asc',
      },
    });

    subcategories = subcategoryStats.map(stat => ({
      subcategory: stat.subcategory,
      name: subcategoryMap[category]?.[stat.subcategory] || '기타',
    }));
  }

  // 6. 필터 정보 구성
  const appliedFilter = {
    category: category || null,
    categoryName: category ? categoryMap[category] : null,
    subcategory: subcategory || null,
    subcategoryName: (category && subcategory) ? subcategoryMap[category]?.[subcategory] : null,
  };

  // 7. 전체 개수 계산
  const totalCount = await prisma.item.count({
    where: { userId, isDeleted: false }
  });

  return {
    totalCount,
    categories,
    subcategories, // 상위카테고리 선택 시에만 데이터 포함
    items,
    appliedFilter
  };
};

export const getItemOutfitHistory = async (userId, itemId) => {
  // itemId 유효성 검사
  const parsedItemId = Number(itemId);
  if (isNaN(parsedItemId)) {
    throw new Error('유효하지 않은 itemId입니다.');
  }

  return await prisma.outfit.findMany({
    where: {
      userId,
      outfitItems: {
        some: { itemId: parsedItemId }
      }
    },
    orderBy: { id: 'desc' },
    include: {
      outfitItems: {
        include: { 
          item: {
            select: {
              id: true,
              category: true,
              subcategory: true,
              brand: true,
              color: true,
              size: true,
              season: true,
              image: true
            }
          }
        }
      },
      outfitTags: {
        include: { 
          tag: {
            select: {
              id: true,
              name: true,
              type: true
            }
          }
        }
      },
      outfitLikes: true,
      user: {
        select: {
          id: true,
          nickname: true,
          profileImage: true
        }
      }
    }
  });
};

export const getWardrobeItemsByFilter = async (userId, filterDto) => {
  const { season, color, brand, tagIds } = filterDto;
  const where = {
    userId,
    isDeleted: false,
    ...(season !== undefined && { season }),
    ...(color !== undefined && { color }),
    ...(brand !== undefined && { brand }),
  };

  // 태그 필터: tagIds 중 하나라도 포함된 아이템
  if (tagIds && tagIds.length > 0) {
    return await prisma.item.findMany({
      where: {
        ...where,
        itemTags: {
          some: {
            tagId: { in: tagIds },
          },
        },
      },
      orderBy: { id: 'desc' },
    });
  }

  // 태그 필터 없으면 일반 조건만
  return await prisma.item.findMany({
    where,
    orderBy: { id: 'desc' },
  });
};

export const softDeleteItem = async (userId, itemId) => {
  const item = await prisma.item.findUnique({
    where: { id: itemId },
  });

  if (!item || item.isDeleted || item.userId !== userId) {
    throw new CustomError(errorCode.NOT_FOUND, '삭제할 아이템이 없거나 권한이 없습니다.');
  }

  await prisma.item.update({
    where: { id: itemId },
    data: { isDeleted: true },
  });
};

export const getWardrobeBrandsByUser = async (userId) => {
  const brands = await prisma.item.findMany({
    where: {
      userId,
      isDeleted: false,
      brand: { not: null },
    },
    select: { brand: true },
    orderBy: { id: 'desc' },
    distinct: ['brand'],
  });
  return brands.map(b => b.brand);
};

export const autoClassifyItem = async (imagePath, prompt) => {
  const result = await analyzeImage(imagePath, prompt);
  return result; // { category, subcategory, season, color }
};

export const updateItem = async (itemId, userId, itemData) => {
  // 아이템 존재 및 소유자 확인
  const existingItem = await wardrobeRepo.findItemByItemId(itemId, userId);
  if (!existingItem || existingItem.userId !== userId) {
    const error = new Error('아이템을 찾을 수 없거나 권한이 없습니다.');
    error.status = 404;
    throw error;
  }
  // 날짜 변환
  if (itemData.purchaseDate) {
    itemData.purchaseDate = new Date(itemData.purchaseDate);
  }

  // 태그 업데이트: 기존 태그 제거 후 재등록
  if (itemData.tagIds) {
    await wardrobeRepo.clearItemTags(itemId);
    await wardrobeRepo.createItemTags(itemId, itemData.tagIds);
  }

  // 나머지 필드 업데이트
  return await wardrobeRepo.updateItem(itemId, itemData);
};

export const getItemCategoryInfo = async (itemId, userId) => {
  return await wardrobeRepo.findItemCategoryById(itemId, userId);
};

// 계절 판별 함수 (평균 기온 기준)
const getSeasonFromTemp = (tempAvg) => {
  if (tempAvg >= 23) return 2; // 여름
  if (tempAvg >= 20) return [1, 3]; // 봄가을 (간절기 포함)
  if (tempAvg >= 8) return 3; // 겨울
  return 3; // 겨울 (0도 이하)
};

// 카테고리별 추천 가능한 카테고리 매핑
const getRecommendableCategories = (baseCategory) => {
  switch (baseCategory) {
    case 1: // 상의
      return [2, 4, 5, 6]; // 하의, 아우터, 신발, 액세서리
    case 2: // 하의
      return [1, 4, 5, 6]; // 상의, 아우터, 신발, 액세서리
    case 3: // 원피스
      return [4, 5, 6]; // 아우터, 신발, 액세서리 (상의/하의 제외)
    case 4: // 아우터
      return [1, 2, 5, 6]; // 상의, 하의, 신발, 액세서리
    case 5: // 신발
      return [1, 2, 4]; // 상의, 하의, 아우터
    case 6: // 액세서리
      return [1, 2, 4]; // 상의, 하의, 아우터
    default:
      return [];
  }
};

// 계절 매칭 점수 계산
const calculateSeasonScore = (baseSeason, recommendSeason) => {
  // 동일 계절
  if (baseSeason === recommendSeason) return 10;
  
  // 간절기와 여름/겨울 매칭
  if ((baseSeason === 1 && (recommendSeason === 2 || recommendSeason === 3)) ||
      (recommendSeason === 1 && (baseSeason === 2 || baseSeason === 3))) {
    return 7;
  }
  
  return 0;
};

// 색상 매칭 점수 계산
const calculateColorScore = (baseColor, recommendColor) => {
  // 동일 색상
  if (baseColor === recommendColor) return 10;
  
  // 색상 매칭 규칙 매핑
  const colorRules = {
    1: { // 화이트
      complementary: [2, 5], // 블랙, 네이비/블루
      neutral: [4, 3, 5, 6] // 베이지/브라운, 그레이, 네이비/블루, 레드/핑크
    },
    2: { // 블랙
      complementary: [1, 6, 4], // 화이트, 레드/핑크, 베이지/브라운
      neutral: [5, 3, 9] // 네이비/블루, 그레이, 퍼플
    },
    3: { // 그레이
      complementary: [6, 7], // 레드/핑크, 오렌지/옐로우
      neutral: [1, 2, 5] // 화이트, 블랙, 네이비/블루
    },
    4: { // 베이지/브라운
      complementary: [5, 8], // 네이비/블루, 그린
      neutral: [1, 2, 7] // 화이트, 블랙, 오렌지/옐로우
    },
    5: { // 네이비/블루
      complementary: [4, 1], // 베이지/브라운, 화이트
      neutral: [6, 3] // 레드/핑크, 그레이
    },
    6: { // 레드/핑크
      complementary: [2, 1], // 블랙, 화이트
      neutral: [5, 3] // 네이비/블루, 그레이
    },
    7: { // 오렌지/옐로우
      complementary: [3, 2], // 그레이, 블랙
      neutral: [4] // 베이지/브라운
    },
    8: { // 그린
      complementary: [4], // 베이지/브라운
      neutral: [1, 5] // 화이트, 네이비/블루
    },
    9: { // 퍼플
      complementary: [3, 2], // 그레이, 블랙
      neutral: [1] // 화이트
    },
    10: { // 멀티/패턴
      complementary: [2, 1], // 블랙, 화이트
      neutral: [3, 4] // 그레이, 베이지
    }
  };
  
  const rule = colorRules[baseColor];
  if (!rule) return 0;
  
  // 상보색 조화
  if (rule.complementary.includes(recommendColor)) return 8;
  
  // 무난한 조합
  if (rule.neutral.includes(recommendColor)) return 5;
  
  return 0;
};

// 스타일 태그 매칭 점수 계산
const calculateTagScore = (baseTags, recommendTags) => {
  if (!baseTags || baseTags.length === 0 || !recommendTags || recommendTags.length === 0) {
    return 0;
  }
  
  const baseTagIds = baseTags.map(tag => tag.tagId);
  const recommendTagIds = recommendTags.map(tag => tag.tagId);
  
  // 기준 아이템의 모든 태그가 추천 아이템에 포함되어 있는지 확인 (100% 일치)
  const allBaseTagsIncluded = baseTagIds.every(tagId => recommendTagIds.includes(tagId));
  if (allBaseTagsIncluded) return 10;
  
  // 1개 이상 부분 일치
  const hasCommonTag = baseTagIds.some(tagId => recommendTagIds.includes(tagId));
  if (hasCommonTag) return 5;
  
  return 0;
};

// 옷장 아이템 추천
export const getRecommendedCoordinatedItems = async (userId, itemId) => {
  // 기준 아이템 조회
  const baseItem = await prisma.item.findFirst({
    where: {
      id: itemId,
      userId,
      isDeleted: false
    },
    include: {
      itemTags: {
        include: {
          tag: true
        }
      }
    }
  });
  
  if (!baseItem) {
    throw new Error('해당 아이템을 찾을 수 없습니다.');
  }
  
  // 추천 가능한 카테고리 가져오기
  const recommendableCategories = getRecommendableCategories(baseItem.category);
  if (recommendableCategories.length === 0) {
    return [];
  }
  
  // 추천 후보 아이템들 조회 (기준 아이템 제외)
  const candidateItems = await prisma.item.findMany({
    where: {
      userId,
      isDeleted: false,
      category: {
        in: recommendableCategories
      },
      id: {
        not: itemId // 기준 아이템 제외
      }
    },
    include: {
      itemTags: {
        include: {
          tag: true
        }
      }
    }
  });
  
  // 각 후보 아이템의 점수 계산
  const scoredItems = candidateItems.map(item => {
    let totalScore = 0;
    
    // 계절 매칭 점수
    const seasonScore = calculateSeasonScore(baseItem.season, item.season);
    totalScore += seasonScore;
    
    // 색상 매칭 점수
    const colorScore = calculateColorScore(baseItem.color, item.color);
    totalScore += colorScore;
    
    // 스타일 태그 매칭 점수
    const tagScore = calculateTagScore(baseItem.itemTags, item.itemTags);
    totalScore += tagScore;
    
    return {
      ...item,
      matchingScore: totalScore,
      scoreBreakdown: {
        season: seasonScore,
        color: colorScore,
        tag: tagScore
      }
    };
  });
  
  // 22점 이상인 아이템만 필터링하고 점수순으로 정렬하여 상위 5개 선택
  const recommendedItems = scoredItems
    .filter(item => item.matchingScore >= 22)
    .sort((a, b) => b.matchingScore - a.matchingScore)
    .slice(0, 5)
    .map(item => ({
      id: item.id,
      category: item.category,
      subcategory: item.subcategory,
      brand: item.brand,
      color: item.color,
      size: item.size,
      season: item.season,
      image: item.image,
      tags: item.itemTags.map(itemTag => ({
        id: itemTag.tag.id,
        name: itemTag.tag.name,
        type: itemTag.tag.type
      })),
      matchingScore: item.matchingScore,
      scoreBreakdown: item.scoreBreakdown
    }));
  
  return recommendedItems;
};
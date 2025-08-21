import { PrismaClient } from '@prisma/client';
import { CustomError } from '../../utils/error.js';
const prisma = new PrismaClient();

export const toggleOutfitLike = async (userId, outfitId) => {
  try {
    // userId 및 outfitId 검증
    if (!userId || userId <= 0) {
      throw new CustomError('유효하지 않은 사용자 ID입니다.', 'INVALID_USER_ID', 400);
    }
    
    if (!outfitId || outfitId <= 0) {
      throw new CustomError('유효하지 않은 아웃핏 ID입니다.', 'INVALID_OUTFIT_ID', 400);
    }

    // 한국 시간대 기준으로 오늘 시작/끝 시간 설정 (다른 함수들과 일관성 유지)
    const now = new Date();
    
    // 현재 UTC 시간을 한국 시간으로 변환하여 날짜 계산
    const kstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    
    // 한국 시간 기준으로 오늘 00:00:00 ~ 23:59:59
    const kstYear = kstNow.getUTCFullYear();
    const kstMonth = kstNow.getUTCMonth();
    const kstDate = kstNow.getUTCDate();
    
    // UTC로 다시 변환 (한국 시간 00:00:00 = UTC 15:00:00 전날)
    const startOfDay = new Date(Date.UTC(kstYear, kstMonth, kstDate - 1, 15, 0, 0, 0));
    const endOfDay = new Date(Date.UTC(kstYear, kstMonth, kstDate, 14, 59, 59, 999));

    // 아웃핏이 존재하고, 공개된 상태이며, 오늘 날짜인지 확인
    const outfit = await prisma.outfit.findFirst({
      where: {
        id: outfitId,
        isPublished: true,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        }
      },
      select: {
        id: true,
        userId: true
      }
    });

    if (!outfit) {
      throw new CustomError('해당 아웃핏을 찾을 수 없거나 오늘 공개된 아웃핏이 아닙니다.', 'OUTFIT_NOT_FOUND', 404);
    }

    // 자신의 게시물에는 좋아요 불가
    if (outfit.userId === userId) {
      throw new CustomError('자신의 게시물에는 좋아요를 누를 수 없습니다.', 'SELF_LIKE_NOT_ALLOWED', 400);
    }

    // 기존 좋아요 확인
    const existing = await prisma.outfitLike.findFirst({
      where: { userId, outfitId },
    });

    if (existing) {
      // 좋아요 취소
      await prisma.outfitLike.delete({
        where: { id: existing.id },
      });
      
      // 업데이트된 좋아요 수 조회
      const likeCount = await prisma.outfitLike.count({
        where: { outfitId }
      });
      
      return {
        outfit_id: outfitId,
        hearted: false,
        heart_count: likeCount
      };
    } else {
      // 좋아요 추가
      await prisma.outfitLike.create({
        data: { userId, outfitId },
      });
      
      // 업데이트된 좋아요 수 조회
      const likeCount = await prisma.outfitLike.count({
        where: { outfitId }
      });
      
      return {
        outfit_id: outfitId,
        hearted: true,
        heart_count: likeCount
      };
    }

  } catch (error) {
    // CustomError는 그대로 throw
    if (error instanceof CustomError) {
      throw error;
    }
    
    // Prisma 에러나 기타 에러 처리
    console.error('toggleOutfitLike 에러:', error);
    throw new CustomError('좋아요 처리 중 오류가 발생했습니다.', 'DATABASE_ERROR', 500);
  }
};

export const getPublishedOutfitsByOutfitTags = async (outfitTagIds, order = 'latest') => {
  // order: 'latest' | 'popular'
  const orderBy = order === 'popular'
    ? [{ outfitLikes: { _count: 'desc' } }, { id: 'desc' }]
    : [{ id: 'desc' }];

  return await prisma.outfit.findMany({
    where: {
      isPublished: true,
      outfitTags: {
        some: {
          tagId: { in: outfitTagIds.map(id => Number(id)) }
        }
      }
    },
    orderBy,
    include: {
      user: { select: { id: true, nickname: true, profileImage: true } },
      outfitItems: { include: { item: true } },
      outfitTags: { include: { tag: true } },
      outfitLikes: true
    }
  });
};

//오늘의 아웃핏 상태 조회
export const getTodayOutfitStatus = async (userId) => {
  // 한국 시간대 기준으로 오늘 시작/끝 시간 설정 (올바른 로직)
  const now = new Date();
  
  // 현재 UTC 시간을 한국 시간으로 변환하여 날짜 계산
  const kstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  
  // 한국 시간 기준으로 오늘 00:00:00 ~ 23:59:59
  const kstYear = kstNow.getUTCFullYear();
  const kstMonth = kstNow.getUTCMonth();
  const kstDate = kstNow.getUTCDate();
  
  // UTC로 다시 변환 (한국 시간 00:00:00 = UTC 15:00:00 전날)
  const startOfDay = new Date(Date.UTC(kstYear, kstMonth, kstDate - 1, 15, 0, 0, 0));
  const endOfDay = new Date(Date.UTC(kstYear, kstMonth, kstDate, 14, 59, 59, 999));

  const todayOutfit = await prisma.outfit.findFirst({
    where: {
      userId,
      date: {
        gte: startOfDay,
        lte: endOfDay
      }
    },
    select: {
      id: true,
      date: true,
      mainImage: true,
      isPublished: true
    }
  });

  // 간소화된 응답
  if (!todayOutfit) {
    return {
      canPublish: false,
      reason: "NO_TODAY_OUTFIT"
    };
  }

  // 개발 모드에서 커뮤니티 등록 제한 해제 (환경변수로 제어)
  const isDevMode = process.env.DEV_MODE === 'true';
  
  if (todayOutfit.isPublished && !isDevMode) {
    return {
      canPublish: false,
      reason: "ALREADY_PUBLISHED"
    };
  }

  return {
    canPublish: true,
    date: todayOutfit.date,
    mainImage: todayOutfit.mainImage
  };
};

// 오늘의 아웃핏을 바로 커뮤니티에 공개 (기존 유지)
export const publishTodayOutfitToCommunity = async (userId) => {
  // 한국 시간대 기준으로 오늘 시작/끝 시간 설정 (올바른 로직)
  const now = new Date();
  
  // 현재 UTC 시간을 한국 시간으로 변환하여 날짜 계산
  const kstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  
  // 한국 시간 기준으로 오늘 00:00:00 ~ 23:59:59
  const kstYear = kstNow.getUTCFullYear();
  const kstMonth = kstNow.getUTCMonth();
  const kstDate = kstNow.getUTCDate();
  
  // UTC로 다시 변환 (한국 시간 00:00:00 = UTC 15:00:00 전날)
  const startOfDay = new Date(Date.UTC(kstYear, kstMonth, kstDate - 1, 15, 0, 0, 0));
  const endOfDay = new Date(Date.UTC(kstYear, kstMonth, kstDate, 14, 59, 59, 999));

  const todayOutfit = await prisma.outfit.findFirst({
    where: {
      userId,
      date: {
        gte: startOfDay,
        lte: endOfDay
      }
    },
    include: {
      outfitTags: {
        include: { tag: true }
      }
    }
  });

  if (!todayOutfit) {
    throw new CustomError('오늘 등록한 아웃핏이 없습니다.', 404, 'NO_TODAY_OUTFIT');
  }

  // 개발 모드에서 커뮤니티 등록 제한 해제 (환경변수로 제어)
  const isDevMode = process.env.DEV_MODE === 'true';
  
  if (todayOutfit.isPublished && !isDevMode) {
    throw new CustomError('오늘의 아웃핏이 이미 커뮤니티에 공개되었습니다.', 400, 'ALREADY_PUBLISHED');
  }

  const publishedOutfit = await prisma.outfit.update({
    where: { id: todayOutfit.id },
    data: { isPublished: true },
    include: {
      user: {
        select: { id: true, nickname: true, profileImage: true }
      },
      outfitTags: {
        include: { tag: true }
      }
    }
  });

  return publishedOutfit;
};

// 커뮤니티에 공개된 아웃핏 삭제 (본인 소유만)
export const deletePublishedOutfit = async (userId, outfitId) => {
  // 1. 공개된 아웃핏이 맞고 본인 소유인지 확인
  const outfit = await prisma.outfit.findFirst({
    where: {
      id: outfitId,
      userId: userId,
      isPublished: true
    }
  });

  if (!outfit) {
    throw new CustomError('삭제할 수 없는 아웃핏입니다. 존재하지 않거나 권한이 없습니다.', 403, 'FORBIDDEN');
  }

   // 연관 데이터 삭제
  await prisma.outfitLike.deleteMany({ where: { outfitId } });
  await prisma.outfitTag.deleteMany({ where: { outfitId } });
  await prisma.outfitItem.deleteMany({ where: { outfitId } });

  // 아웃핏 삭제
  await prisma.outfit.delete({ where: { id: outfitId } });

  return { message: '아웃핏 게시글이 삭제되었습니다.' };
};

export const checkIfTodayOutfitCanBeShared = async (userId) => {
  try {
    // userId 유효성 검사
    if (!userId || userId <= 0) {
      throw new CustomError('유효하지 않은 사용자 ID입니다.', 'INVALID_USER_ID', 400);
    }

    // 한국 시간대 기준으로 오늘 시작/끝 시간 설정 (올바른 로직)
    const now = new Date();
    
    // 현재 UTC 시간을 한국 시간으로 변환하여 날짜 계산
    const kstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    
    // 한국 시간 기준으로 오늘 00:00:00 ~ 23:59:59
    const kstYear = kstNow.getUTCFullYear();
    const kstMonth = kstNow.getUTCMonth();
    const kstDate = kstNow.getUTCDate();
    
    // UTC로 다시 변환 (한국 시간 00:00:00 = UTC 15:00:00 전날)
    const startOfDay = new Date(Date.UTC(kstYear, kstMonth, kstDate - 1, 15, 0, 0, 0));
    const endOfDay = new Date(Date.UTC(kstYear, kstMonth, kstDate, 14, 59, 59, 999));

    const todayOutfit = await prisma.outfit.findFirst({
      where: {
        userId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      select: {
        id: true,
        isPublished: true,
        date: true,
        mainImage: true
      },
    });

    // 오늘 아웃핏이 없는 경우
    if (!todayOutfit) {
      return {
        canShare: false,
        reason: 'NO_TODAY_OUTFIT',
        message: '오늘 등록한 아웃핏이 없습니다.',
        outfitId: null,
        date: null,
        mainImage: null
      };
    }

    // 개발 모드에서 커뮤니티 등록 제한 해제 (환경변수로 제어)
    const isDevMode = process.env.DEV_MODE === 'true';
    
    // 오늘 아웃핏이 있지만 이미 공유된 경우
    if (todayOutfit.isPublished && !isDevMode) {
      return {
        canShare: false,
        reason: 'ALREADY_PUBLISHED',
        message: '오늘의 아웃핏이 이미 커뮤니티에 공개되었습니다.',
        outfitId: todayOutfit.id,
        date: todayOutfit.date,
        mainImage: todayOutfit.mainImage
      };
    }

    // 오늘 아웃핏이 있고 공유 가능한 경우
    return {
      canShare: true,
      reason: 'CAN_SHARE',
      message: '오늘의 아웃핏을 커뮤니티에 공개할 수 있습니다.',
      outfitId: todayOutfit.id,
      date: todayOutfit.date,
      mainImage: todayOutfit.mainImage
    };
  } catch (error) {
    // CustomError는 그대로 전파
    if (error.errorCode) {
      throw error;
    }
    // 데이터베이스 연결 오류 등 예상치 못한 오류
    console.error('오늘 아웃핏 공유 가능 상태 확인 중 오류:', error);
    throw new CustomError('서버 오류가 발생했습니다.', 'DATABASE_ERROR', 500);
  }
};

// 특정 아웃핏의 태그 조회 (mood/purpose 구분)
export const getOutfitTags = async (outfitId) => {
  // 아웃핏이 존재하고 공개된 상태인지 확인
  const outfit = await prisma.outfit.findFirst({
    where: {
      id: outfitId,
      isPublished: true
    },
    include: {
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
      }
    }
  });

  if (!outfit) {
    throw new Error('해당 아웃핏을 찾을 수 없거나 공개되지 않은 아웃핏입니다.');
  }

  // 태그들을 mood와 purpose로 분류
  const tags = outfit.outfitTags.map(outfitTag => outfitTag.tag);
  const moodTags = tags.filter(tag => tag.type === 'mood');
  const purposeTags = tags.filter(tag => tag.type === 'purpose');

  return {
    outfitId: outfit.id,
    moodTags,
    purposeTags
  };
};

// 커뮤니티 게시글 상세 조회
export const getOutfitDetail = async (outfitId, currentUserId) => {
  try {
    // outfitId 및 currentUserId 검증
    if (!outfitId || outfitId <= 0) {
      throw new CustomError('유효하지 않은 아웃핏 ID입니다.', 'INVALID_OUTFIT_ID', 400);
    }
    
    if (!currentUserId || currentUserId <= 0) {
      throw new CustomError('유효하지 않은 사용자 ID입니다.', 'INVALID_USER_ID', 400);
    }

    // 한국 시간대 기준으로 오늘 시작/끝 시간 설정 (다른 함수들과 일관성 유지)
    const now = new Date();
    
    // 현재 UTC 시간을 한국 시간으로 변환하여 날짜 계산
    const kstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    
    // 한국 시간 기준으로 오늘 00:00:00 ~ 23:59:59
    const kstYear = kstNow.getUTCFullYear();
    const kstMonth = kstNow.getUTCMonth();
    const kstDate = kstNow.getUTCDate();
    
    // UTC로 다시 변환 (한국 시간 00:00:00 = UTC 15:00:00 전날)
    const startOfDay = new Date(Date.UTC(kstYear, kstMonth, kstDate - 1, 15, 0, 0, 0));
    const endOfDay = new Date(Date.UTC(kstYear, kstMonth, kstDate, 14, 59, 59, 999));

    // 아웃핏이 존재하고, 공개된 상태이며, 오늘 날짜인지 확인
    const outfit = await prisma.outfit.findFirst({
      where: {
        id: outfitId,
        isPublished: true,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        }
      },
    include: {
      user: {
        select: {
          id: true,
          nickname: true,
          profileImage: true
        }
      },
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
      outfitLikes: {
        select: {
          id: true,
          userId: true
        }
      }
    }
  });

    if (!outfit) {
      throw new CustomError('해당 아웃핏을 찾을 수 없거나 오늘 공개된 아웃핏이 아닙니다.', 'OUTFIT_NOT_FOUND', 404);
    }

    // 태그들을 mood와 purpose로 분류
    const tags = outfit.outfitTags.map(outfitTag => outfitTag.tag);
    const moodTags = tags.filter(tag => tag.type === 'mood');
    const purposeTags = tags.filter(tag => tag.type === 'purpose');

    // 현재 사용자가 좋아요를 눌렀는지 확인
    const isLikedByCurrentUser = outfit.outfitLikes.some(like => like.userId === currentUserId);

    // 내 게시글인지 확인
    const isMyPost = outfit.user.id === currentUserId;

    return {
      outfitId: outfit.id,
      author: outfit.user,
      date: outfit.date,
      mainImage: outfit.mainImage,
      memo: outfit.memo,
      weatherTempAvg: outfit.weatherTempAvg,
      feelsLikeTemp: outfit.feelsLikeTemp,
      items: outfit.outfitItems.map(outfitItem => outfitItem.item),
      tags: {
        moodTags,
        purposeTags
      },
      likes: {
        count: outfit.outfitLikes.length,
        isLikedByCurrentUser
      },
      isMyPost
    };

  } catch (error) {
    // CustomError는 그대로 throw
    if (error instanceof CustomError) {
      throw error;
    }
    
    // Prisma 에러나 기타 에러 처리
    console.error('getOutfitDetail 에러:', error);
    throw new CustomError('아웃핏 상세 조회 중 오류가 발생했습니다.', 'DATABASE_ERROR', 500);
  }
};



export const getCommunityOutfits = async (order = 'latest', page = 1, limit = 20, tagIds = null) => {
  try {
    // 매개변수 유효성 검사
    if (typeof order !== 'string' || !['latest', 'popular'].includes(order)) {
      throw new CustomError('유효하지 않은 정렬 방식입니다.', 'INVALID_ORDER', 400);
    }
    
    if (!Number.isInteger(page) || page < 1) {
      throw new CustomError('페이지 번호는 1 이상의 정수여야 합니다.', 'INVALID_PAGE', 400);
    }
    
    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
      throw new CustomError('limit은 1~100 사이의 정수여야 합니다.', 'INVALID_LIMIT', 400);
    }

    // 한국 시간대 기준으로 오늘 시작/끝 시간 설정 (다른 함수들과 일관성 유지)
    const now = new Date();
    
    // 현재 UTC 시간을 한국 시간으로 변환하여 날짜 계산
    const kstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    
    // 한국 시간 기준으로 오늘 00:00:00 ~ 23:59:59
    const kstYear = kstNow.getUTCFullYear();
    const kstMonth = kstNow.getUTCMonth();
    const kstDate = kstNow.getUTCDate();
    
    // UTC로 다시 변환 (한국 시간 00:00:00 = UTC 15:00:00 전날)
    const startOfDay = new Date(Date.UTC(kstYear, kstMonth, kstDate - 1, 15, 0, 0, 0));
    const endOfDay = new Date(Date.UTC(kstYear, kstMonth, kstDate, 14, 59, 59, 999));

    const orderBy = order === 'popular'
      ? [{ outfitLikes: { _count: 'desc' } }, { id: 'desc' }]
      : [{ date: 'asc' }]; // 최신 등록순: 날짜 오름차순 (이른 시간부터)

    const offset = (page - 1) * limit;

    // 기본 조건: 공개된 오늘의 아웃핏
    const whereCondition = {
      isPublished: true,
      date: {
        gte: startOfDay,
        lte: endOfDay,
      }
    };

    // 태그 필터링 추가 (선택적)
    if (tagIds && tagIds.length > 0) {
      // 태그 존재 여부 검증 (옵션: 성능 고려하여 생략 가능)
      const existingTags = await prisma.tag.findMany({
        where: { id: { in: tagIds } },
        select: { id: true }
      });
      
      if (existingTags.length !== tagIds.length) {
        const existingTagIds = existingTags.map(tag => tag.id);
        const invalidTagIds = tagIds.filter(id => !existingTagIds.includes(id));
        throw new CustomError(`존재하지 않는 태그 ID: [${invalidTagIds.join(', ')}]`, 'TAG_NOT_FOUND', 404);
      }

      whereCondition.outfitTags = {
        some: {
          tagId: { in: tagIds }
        }
      };
    }

    const outfits = await prisma.outfit.findMany({
      where: whereCondition,
      orderBy,
      skip: offset,
      take: limit,
      include: {
        user: { select: { id: true, nickname: true, profileImage: true } },
        outfitTags: { include: { tag: true } },
        _count: {
          select: { outfitLikes: true }
        }
      },
    });

    return outfits;

  } catch (error) {
    // CustomError는 그대로 throw
    if (error instanceof CustomError) {
      throw error;
    }
    
    // Prisma 에러나 기타 에러 처리
    console.error('getCommunityOutfits 에러:', error);
    throw new CustomError('커뮤니티 아웃핏 조회 중 오류가 발생했습니다.', 'DATABASE_ERROR', 500);
  }
};

export const getYesterdayTopOutfits = async () => {
  const now = new Date();                  // 현재 시각
  const yesterday = new Date(now);        // 오늘 복사
  yesterday.setDate(now.getDate() - 1);   // 어제 날짜로 변경
  yesterday.setHours(0, 0, 0, 0);         // 어제 00:00:00

  const nextDay = new Date(yesterday);
  nextDay.setDate(yesterday.getDate() + 1); // 어제 + 1일 = 오늘 00:00:00

  return await prisma.outfit.findMany({
    where: {
      isPublished: true,
      date: {
        gte: yesterday,
        lt: nextDay
      }
    },
    orderBy: [
      { outfitLikes: { _count: 'desc' } },
      { id: 'desc' }
    ],
    take: 3,
    include: {
      user: { select: { nickname: true } },
      _count: { select: { outfitLikes: true } }
    }
  });
};


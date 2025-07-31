import { PrismaClient } from '@prisma/client';
import { CustomError } from '../../utils/error.js';
const prisma = new PrismaClient();

export const toggleOutfitLike = async (userId, outfitId) => {
  const existing = await prisma.outfitLike.findFirst({
    where: { userId, outfitId },
  });

  if (existing) {
    // 좋아요 취소
    await prisma.outfitLike.delete({
      where: { id: existing.id },
    });
    return { liked: false, message: '좋아요 취소됨' };
  } else {
    // 좋아요 추가
    await prisma.outfitLike.create({
      data: { userId, outfitId },
    });
    return { liked: true, message: '좋아요 추가됨' };
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
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);

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

  if (todayOutfit.isPublished) {
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
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);

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

  if (todayOutfit.isPublished) {
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
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const todayOutfit = await prisma.outfit.findFirst({
    where: {
      userId,
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    select: {
      isPublished: true,
    },
  });

  // todayOutfit이 존재하고, isPublished가 false일 때만 true를 반환
  return !!todayOutfit && !todayOutfit.isPublished;
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
  // 아웃핏이 존재하고 공개된 상태인지 확인
  const outfit = await prisma.outfit.findFirst({
    where: {
      id: outfitId,
      isPublished: true
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
    throw new Error('해당 아웃핏을 찾을 수 없거나 공개되지 않은 아웃핏입니다.');
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
};



export const getCommunityOutfits = async (order = 'latest', page = 1, limit = 20) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 오늘 00:00:00 시작 시간

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1); // 내일 00:00:00

  const orderBy = order === 'popular'
    ? [{ outfitLikes: { _count: 'desc' } }, { id: 'desc' }]
    : [{ id: 'desc' }];

  const offset = (page - 1) * limit;

  return await prisma.outfit.findMany({
    where: {
      isPublished: true,
      date: {
        gte: today,
        lt: tomorrow,
      }
    },
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


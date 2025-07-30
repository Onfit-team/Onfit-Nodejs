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

export const getPublishedOutfitsByOutfitTagsController = async (req, res, next) => {
  try {
    const { outfit_tag_ids, order } = req.query;
    if (!outfit_tag_ids) {
      return res.status(400).json({ isSuccess: false, message: 'outfit_tag_ids 파라미터가 필요합니다.' });
    }
    const outfitTagIds = outfit_tag_ids.split(',').map(id => Number(id.trim())).filter(Boolean);
    if (outfitTagIds.length === 0) {
      return res.status(400).json({ isSuccess: false, message: '유효한 outfit_tag_ids가 필요합니다.' });
    }
    // order: 'latest'(기본) | 'popular'
    const outfits = await communityService.getPublishedOutfitsByOutfitTags(outfitTagIds, order);
    if (!outfits || outfits.length === 0) {
      return res.status(200).json({ isSuccess: true, result: [], message: '해당하는 아웃핏이 없습니다.' });
    }
    return res.status(200).json({ isSuccess: true, result: outfits });
  } catch (err) {
    next(err);
  }
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
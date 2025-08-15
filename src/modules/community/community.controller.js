// ✅ src/modules/community/community.controller.js
import * as communityService from './community.service.js';
import { OkSuccess, CreatedSuccess } from '../../utils/success.js';
import { CustomError } from '../../utils/error.js';

export const toggleOutfitLikeController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { outfitId } = req.params;
    
    // userId 기본 검증
    if (!userId || userId <= 0) {
      throw new CustomError('유효하지 않은 사용자 ID입니다.', 'INVALID_USER_ID', 400);
    }
    
    // outfitId 기본 검증
    if (!outfitId) {
      throw new CustomError('outfitId가 필요합니다.', 'MISSING_OUTFIT_ID', 400);
    }
    
    const parsedOutfitId = parseInt(outfitId, 10);
    if (isNaN(parsedOutfitId) || parsedOutfitId <= 0) {
      throw new CustomError('유효하지 않은 outfitId입니다.', 'INVALID_OUTFIT_ID', 400);
    }

    const result = await communityService.toggleOutfitLike(userId, parsedOutfitId);

    return res.status(200).json(new OkSuccess(result, '좋아요 토글 성공'));
  } catch (err) {
    next(err);
  }
};

export const getTodayOutfitStatusController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const status = await communityService.getTodayOutfitStatus(userId);
    return res.status(200).json(new OkSuccess(status, '오늘의 아웃핏 상태 조회 성공'));
  } catch (err) {
    next(err);
  }
};

// 오늘의 아웃핏을 커뮤니티에 공개
export const publishTodayOutfitController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const result = await communityService.publishTodayOutfitToCommunity(userId);
    return res.status(200).json(new OkSuccess(result, '오늘의 아웃핏이 커뮤니티에 공개되었습니다.'));
  } catch (err) {
    next(err);
  }
};

export const deletePublishedOutfitController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const outfitId = parseInt(req.params.outfitId);

    const result = await communityService.deletePublishedOutfit(userId, outfitId);

    return res.status(200).json(new OkSuccess(result, '아웃핏 게시글이 삭제되었습니다.'));
  } catch (err) {
    next(err);
  }
};

export const checkTodayOutfitShareabilityController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    
    // userId 기본 검증
    if (!userId || userId <= 0) {
      throw new CustomError('유효하지 않은 사용자 ID입니다.', 'INVALID_USER_ID', 400);
    }
    
    const canShare = await communityService.checkIfTodayOutfitCanBeShared(userId);
    
    return res.status(200).json(new OkSuccess(canShare, '오늘의 아웃핏 공유 가능 상태 조회 성공'));
  } catch (err) {
    next(err);
  }
};

export const getOutfitTagsController = async (req, res, next) => {
  try {
    const { outfitId } = req.params;
    const parsedOutfitId = parseInt(outfitId, 10);
    
    if (!outfitId || isNaN(parsedOutfitId)) {
      return res.status(400).json({
        isSuccess: false,
        message: 'outfitId가 올바르지 않습니다.'
      });
    }

    const outfitTags = await communityService.getOutfitTags(parsedOutfitId);
    
    return res.status(200).json(new OkSuccess(outfitTags, '아웃핏 태그 조회 성공'));
  } catch (err) {
    if (err.message === '해당 아웃핏을 찾을 수 없거나 공개되지 않은 아웃핏입니다.') {
      return res.status(404).json({
        isSuccess: false,
        message: err.message
      });
    }
    next(err);
  }
};

export const getOutfitDetailController = async (req, res, next) => {
  try {
    const { outfitId } = req.params;
    const currentUserId = req.user.userId;
    
    // outfitId 기본 검증
    if (!outfitId) {
      throw new CustomError('outfitId가 필요합니다.', 'MISSING_OUTFIT_ID', 400);
    }
    
    const parsedOutfitId = parseInt(outfitId, 10);
    if (isNaN(parsedOutfitId) || parsedOutfitId <= 0) {
      throw new CustomError('유효하지 않은 outfitId입니다.', 'INVALID_OUTFIT_ID', 400);
    }
    
    // currentUserId 기본 검증
    if (!currentUserId || currentUserId <= 0) {
      throw new CustomError('유효하지 않은 사용자 ID입니다.', 'INVALID_USER_ID', 400);
    }

    const outfitDetail = await communityService.getOutfitDetail(parsedOutfitId, currentUserId);
    
    return res.status(200).json(new OkSuccess(outfitDetail, '커뮤니티 게시글 상세 조회 성공'));
  } catch (err) {
    next(err);
  }
};

export const getCommunityOutfitsController = async (req, res, next) => {
  try {
    const order = req.query.order || 'latest';
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 20;
    const { tag_ids } = req.query;

    // order 파라미터 검증
    const validOrders = ['latest', 'popular'];
    if (!validOrders.includes(order)) {
      throw new CustomError('order 파라미터는 latest 또는 popular여야 합니다.', 'INVALID_ORDER', 400);
    }

    // 페이징 파라미터 검증
    if (isNaN(page) || page < 1) {
      throw new CustomError('page는 1 이상의 숫자여야 합니다.', 'INVALID_PAGE', 400);
    }
    
    if (isNaN(limit) || limit < 1 || limit > 100) {
      throw new CustomError('limit은 1~100 사이의 숫자여야 합니다.', 'INVALID_LIMIT', 400);
    }

    // 태그 ID 파싱 및 검증 (선택적)
    let tagIds = null;
    if (tag_ids) {
      const rawTagIds = tag_ids.split(',').map(id => id.trim());
      
      // 모든 태그 ID가 유효한 숫자인지 확인
      const parsedTagIds = rawTagIds.map(id => {
        const num = Number(id);
        if (isNaN(num) || num <= 0) {
          throw new CustomError(`유효하지 않은 태그 ID입니다: ${id}`, 'INVALID_TAG_ID', 400);
        }
        return num;
      });
      
      if (parsedTagIds.length === 0) {
        throw new CustomError('유효한 tag_ids가 필요합니다.', 'EMPTY_TAG_IDS', 400);
      }
      
      tagIds = parsedTagIds;
    }

    // 서비스에서 outfits 배열 가져오기 (태그 필터링 포함)
    const outfits = await communityService.getCommunityOutfits(order, page, limit, tagIds);

    // 결과에서 최소 정보만 추려서 반환 (likeCount 집계 방법 다양성에 대응)
    const minimalOutfits = outfits.map(outfit => ({
      id: outfit.id,
      nickname: outfit.user.nickname,
      mainImage: outfit.mainImage,
      likeCount:
        typeof outfit.likeCount === "number" ? outfit.likeCount :
        (outfit._count?.outfitLikes ?? (Array.isArray(outfit.outfitLikes) ? outfit.outfitLikes.length : 0))
    }));

    return res.status(200).json({
      isSuccess: true,
      code: 'COMMON200',
      message: '커뮤니티 아웃핏 목록 조회 성공',
      result: {
        outfits: minimalOutfits,
        // pagination 정보가 필요하면 result.pagination 등 추가
      }
    });
  } catch (err) {
    next(err);
  }
};


export const getYesterdayTopOutfitsController = async (req, res, next) => {
  try {
    const outfits = await communityService.getYesterdayTopOutfits();
    const result = outfits.map((outfit, idx) => ({
      id: outfit.id,
      nickname: outfit.user.nickname,
      mainImage: outfit.mainImage,
      likeCount: outfit._count?.outfitLikes || 0,
      rank: idx + 1
    }));

    return res.status(200).json({
      isSuccess: true,
      code: 'COMMON200',
      message: '어제 인기 OUTFIT TOP3 조회 성공',
      result
    });
  } catch (err) {
    next(err);
  }
};

// ✅ src/modules/community/community.controller.js
import * as communityService from './community.service.js';
import { OkSuccess, CreatedSuccess } from '../../utils/success.js';

export const toggleOutfitLikeController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const outfitId = parseInt(req.params.outfitId);

    const result = await communityService.toggleOutfitLike(userId, outfitId);

    return res.status(200).json(new OkSuccess(result));
  } catch (err) {
    next(err);
  }
};

export const getPublishedOutfitsByOutfitTagsController = async (req, res, next) => {
  try {
    const { outfit_tag_ids } = req.query;
    if (!outfit_tag_ids) {
      return res.status(400).json({ isSuccess: false, message: 'outfit_tag_ids 파라미터가 필요합니다.' });
    }
    const outfitTagIds = outfit_tag_ids.split(',').map(id => Number(id.trim())).filter(Boolean);
    if (outfitTagIds.length === 0) {
      return res.status(400).json({ isSuccess: false, message: '유효한 outfit_tag_ids가 필요합니다.' });
    }
    const outfits = await communityService.getPublishedOutfitsByOutfitTags(outfitTagIds);
    if (!outfits || outfits.length === 0) {
      return res.status(200).json({ isSuccess: true, result: [], message: '해당하는 아웃핏이 없습니다.' });
    }
    return res.status(200).json({ isSuccess: true, result: outfits });
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
    const canShare = await communityService.checkIfTodayOutfitCanBeShared(userId);
    
    return res.status(200).json(new OkSuccess(canShare, '오늘의 아웃핏 공유 가능 상태 조회 성공'));
  } catch (err) {
    next(err);
  }
};


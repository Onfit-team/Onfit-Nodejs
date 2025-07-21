// ✅ src/modules/community/community.controller.js
import * as communityService from './community.service.js';
import { OkSuccess } from '../../utils/success.js';

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

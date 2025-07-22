import { 
  createOutfit, 
  getFeelsLikeTempOptions, 
  getAllTags
} from './outfit.service.js';
import { OkSuccess, CreatedSuccess } from '../../utils/success.js';
import { InvalidInputError } from '../../utils/error.js';

export const getFeelsLikeTempController = (req, res, next) => {
  try {
    const feelsLikeOptions = getFeelsLikeTempOptions();
    res.status(200).json(new OkSuccess({ feelsLikeOptions }, "체감온도 선택지 조회 성공"));
  } catch (err) {
    next(new InvalidInputError("체감온도 선택지 조회 실패", err.message));
  }
};

export const getTagsController = async(req, res, next) => {
  try {
    const tags = await getAllTags();
    res.status(200).json(new OkSuccess({ tags }, "태그 목록 조회 성공"));
  } catch (err) {
    next(new InvalidInputError("태그 목록 조회 실패", err.message));
  }
};

export const createOutfitController = async (req, res, next) => {
  try {
    const { date, mainImage } = req.body;
    const { moodTags = [], purposeTags = [] } = req.body;
    const userId = req.user.userId || req.user.id; // JWT에서 사용자 ID 추출
    
    
    // 필수 필드 검증
    if (!date || !mainImage) {
      throw new InvalidInputError("날짜와 이미지는 필수입니다.");
    }
    
    // 태그 개수 검증 (무드 + 용도 합쳐서 최대 3개)
    const totalTags = moodTags.length + purposeTags.length;
    if (totalTags > 3) {
      throw new InvalidInputError("태그는 최대 3개까지만 선택할 수 있습니다.");
    }
    
    const outfit = await createOutfit({ ...req.body, userId: userId });
     
    res.status(201).json(new CreatedSuccess(outfit, "아웃핏 등록 성공"));
  } catch (err) {
    next(new InvalidInputError("아웃핏 등록 실패", err.message));
  }
};

//비슷한 온도 Outfit 조회 컨트롤러
export const getSimilarOutfitsController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const tempRange = req.query.range ? parseInt(req.query.range) : 2;
    
    const result = await getSimilarTemperatureOutfits(userId, tempRange);
    res.status(200).json(new OkSuccess(result, "비슷한 온도의 옷차림 기록 조회 성공"));
  } catch (err) {
    next(err);
  }
};
import Joi from 'joi';

// 코디 수정 요청 DTO
export const outfitUpdateRequestSchema = Joi.object({
  text: Joi.string().min(1).max(300).optional()
});

// 코디 등록 요청 DTO
export const outfitCreateRequestSchema = Joi.object({
  text: Joi.string().min(1).max(300).required(),
  mainImage: Joi.string().required()
});

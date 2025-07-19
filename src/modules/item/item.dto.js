import Joi from 'joi';

export const itemCreateRequestSchema = Joi.object({
  category: Joi.string().valid("상의", "하의", "아우터", "신발").required(),
  color: Joi.string().required(),
  season: Joi.string().valid("봄", "여름", "가을", "겨울").required(),
  purchase_info: Joi.string().optional()
});

export const itemUpdateRequestSchema = Joi.object({
  category: Joi.string().valid("상의", "하의", "아우터", "신발").optional(),
  color: Joi.string().optional(),
  season: Joi.string().valid("봄", "여름", "가을", "겨울").optional(),
  purchase_info: Joi.string().optional()
});

export const toItemResponse = (item, baseUrl = "") => ({
  item_id: item.item_id,
  user_id: item.user_id,
  image_url: baseUrl ? `${baseUrl}/${item.image_url}` : item.image_url,
  original_image_url: baseUrl ? `${baseUrl}/${item.original_image_url}` : item.original_image_url,
  category: item.category,
  color: item.color,
  season: item.season,
  purchase_info: item.purchase_info,
  created_at: item.created_at
});

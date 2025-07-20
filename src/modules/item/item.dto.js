import Joi from 'joi';

export const itemCreateRequestSchema = Joi.object({
  category: Joi.string().valid(
    "상의", "하의", "원피스", "아우터", "신발", "액세서리"
  ).required(),
  color: Joi.string().valid(
    "화이트", "블랙", "그레이", "베이지/브라운", "네이비/블루",
    "레드/핑크", "오렌지/옐로우", "그린", "퍼플", "멀티/패턴"
  ).required(),
  season: Joi.string().valid(
    "간절기(봄/가을)", "여름", "겨울"
  ).required(),
  purchase_info: Joi.string().optional()
});

export const itemUpdateRequestSchema = Joi.object({
  category: Joi.string().valid(
    "상의", "하의", "원피스", "아우터", "신발", "액세서리"
  ).optional(),
  color: Joi.string().valid(
    "화이트", "블랙", "그레이", "베이지/브라운", "네이비/블루",
    "레드/핑크", "오렌지/옐로우", "그린", "퍼플", "멀티/패턴"
  ).optional(),
  season: Joi.string().valid(
    "간절기(봄/가을)", "여름", "겨울"
  ).optional(),
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

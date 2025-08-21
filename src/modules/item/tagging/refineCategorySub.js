import { subcategoryMap } from "./maps.js";

/**
 * 카테고리/서브카테고리 보정
 * @param {Object} tags - 기존 태그 객체
 * @param {Object|number} [bboxOrRatio] - bbox 정보 또는 height ratio
 * @returns {Object} 보정된 태그 객체
 */
export function refineCategorySub(tags, bboxOrRatio = null) {
  let category = tags.category;
  let sub = tags.subcategory;

  // name 기반 판단
  const name = (tags.label || tags.subcategoryName || "").toLowerCase();
  const desc = (tags.pattern?.patternDescription || "").toLowerCase();

  // ========== TOP ==========
  if (name.includes("short-sleeve")) {
    category = 1; sub = 1;
  } else if (name.includes("long-sleeve")) {
    category = 1; sub = 2;
  } else if (["sleeveless", "tank"].some(k => name.includes(k))) {
    category = 1; sub = 3;
  } else if (["blouse", "shirt"].some(k => name.includes(k))) {
    category = 1; sub = 4;
  } else if (name.includes("sweatshirt")) {
    category = 1; sub = 5;
  } else if (name.includes("hoodie")) {
    category = 1; sub = 6;
  } else if (name.includes("knit")) {
    category = 1; sub = 7;

  // ========== BOTTOM ==========
  } else if (["jeans", "denim"].some(k => name.includes(k))) {
    category = 2; sub = 3;
  } else if (["pants", "trousers"].some(k => name.includes(k))) {
    category = 2; sub = 2;
  } else if (["shorts", "short pants"].some(k => name.includes(k))) {
    category = 2; sub = 1;
  } else if (name.includes("training")) {
    category = 2; sub = 4;
  } else if (name.includes("leggings")) {
    category = 2; sub = 5;
  } else if (name.includes("skirt")) {
    category = 2; sub = 6;

  // ========== SHOES ==========
  } else if (["sneakers", "running"].some(k => name.includes(k))) {
    category = 5; sub = 1;
  } else if (name.includes("boots")) {
    category = 5; sub = 2;
  } else if (name.includes("sandals")) {
    category = 5; sub = 3;
  } else if (name.includes("slippers")) {
    category = 5; sub = 4;
  } else if (name.includes("dress shoes")) {
    category = 5; sub = 5;
  } else if (name.includes("loafers")) {
    category = 5; sub = 6;
  }

  // ========== desc 기반 보정 ==========
  if (category === 2) {
    if (desc.includes("skirt")) {
      sub = 6;
    } else if (["long", "trousers", "full length", "ankle"].some(k => desc.includes(k))) {
      sub = 2;
    } else if (["shorts", "short pants", "above knee", "mini"].some(k => desc.includes(k))) {
      sub = 1;
    }
  }

  // ========== bbox height ratio 활용 ==========
  if (category === 2 && bboxOrRatio) {
    let ratio = null;
    
    if (typeof bboxOrRatio === "number") {
      ratio = bboxOrRatio;
    } else if (bboxOrRatio.height && bboxOrRatio.imageHeight) {
      ratio = bboxOrRatio.height / bboxOrRatio.imageHeight;
    }
    
    if (ratio !== null) {
      if (ratio > 0.7) {
        sub = 2; // long pants
      } else if (ratio < 0.4) {
        sub = 1; // shorts
      }
    }
  }

  const subcategoryName = subcategoryMap[`${category}:${sub}`] || "unknown";
  
  // 기존 tags의 모든 속성을 보존하면서 카테고리 정보만 업데이트
  const result = { 
    ...tags, // color, season, pattern, length 등 모든 기존 태그 보존
    category, 
    subcategory: sub, 
    subcategoryName 
  };
  
  console.log("🔍 [refineCategorySub] input color:", tags.color);
  console.log("🔍 [refineCategorySub] returning color:", result.color);
  
  return result;
}
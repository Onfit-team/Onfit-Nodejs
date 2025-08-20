import { subcategoryMap } from "./maps.js";

/**
 * motif 이름 뽑아내는 유틸 (불필요 단어 제거, 첫 번째 핵심 명사만 추출)
 */
function extractPatternName(desc) {
  if (!desc) return null;
  const tokens = desc
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(
      (w) =>
        w.length > 2 &&
        !["motif", "pattern", "design", "print", "element", "with", "and"].includes(w)
    );
  return tokens.length > 0 ? `${tokens[0]} motif` : null;
}

/**
 * 태깅 결과 후처리 - patternDescription 무조건 보존
 */
export function refineTags(tags) {
  if (!tags) return null;

  const refined = { ...tags };

  if (refined.pattern) {
    const patternType = refined.pattern.patternType || "none";
    const layout = refined.pattern.layout || "plain";
    const count = refined.pattern.count || 1;
    // ✅ 핵심: patternDescription 무조건 보존
    const patternDescription = refined.pattern.patternDescription || "";
    const confidence = refined.pattern.confidence || 0.5;

    let finalLayout = layout;

    if (patternType === "motif") {
      const desc = patternDescription.toLowerCase();
      
      // 개수 기반 판단
      if (count >= 5) {
        finalLayout = "all-over";
      } else if (count === 1) {
        finalLayout = "centered";
      } else if (count >= 2 && count <= 4) {
        // 설명에서 배치 힌트 찾기
        if (/all[- ]?over|scattered|multiple|many|various/.test(desc)) {
          finalLayout = "all-over";
        } else if (/center|chest|front|single|large/.test(desc)) {
          finalLayout = "centered";
        } else {
          finalLayout = "multiple";
        }
      }
      
      // layout 값으로 추가 보정
      if (layout === "all-over" || layout === "scattered") {
        finalLayout = "all-over";
      } else if (layout === "centered" || layout === "center") {
        finalLayout = "centered";
      }
    }

    // ✅ pattern 객체 재구성 시 모든 필드 보존
    refined.pattern = {
      patternType,
      layout: finalLayout,
      count,
      patternDescription, // ✅ 반드시 유지
      confidence, // ✅ confidence도 보존
      patternName: patternType === "motif" ? extractPatternName(patternDescription) : null,
    };

    // ✅ 디버그 로그 추가
    console.log("🔍 [refineTags] patternDescription preserved:", patternDescription);
  }

  // ✅ 전체 refined 객체 반환 (color, category, subcategory 등 모든 정보 포함)
  console.log("🔍 [refineTags] returning full tags:", JSON.stringify(refined, null, 2));
  return refined;
}

/**
 * 카테고리/서브카테고리 보정 - ✅ pattern 객체 및 color 정보 보존하도록 수정
 */
export function refineCategorySub(tags, bboxOrRatio = null) {
  let category = tags.category;
  let sub = tags.subcategory;

  const name = (
    tags.label ||
    tags.subcategoryName ||
    ""
  ).toLowerCase();

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

  if (category === 2) {
    if (desc.includes("skirt")) {
      sub = 6;
    } else if (
      ["long", "trousers", "full length", "ankle"].some(k => desc.includes(k))
    ) {
      sub = 2;
    } else if (
      ["shorts", "short pants", "above knee", "mini"].some(k => desc.includes(k))
    ) {
      sub = 1;
    }
  }

  if (category === 2 && bboxOrRatio) {
    let ratio = null;
    if (typeof bboxOrRatio === "number") {
      ratio = bboxOrRatio;
    } else if (bboxOrRatio.height && bboxOrRatio.imageHeight) {
      ratio = bboxOrRatio.height / bboxOrRatio.imageHeight;
    }

    if (ratio !== null) {
      if (ratio > 0.7) sub = 2;
      else if (ratio < 0.4) sub = 1;
    }
  }

  const subcategoryName = subcategoryMap[`${category}:${sub}`] || "unknown";
  
  // ✅ 핵심: 기존 tags의 모든 속성 보존하면서 카테고리 정보만 업데이트
  const result = { 
    ...tags, // ✅ color, season, pattern 등 모든 기존 태그 보존
    category, 
    subcategory: sub, 
    subcategoryName 
  };
  
  // ✅ 디버그 로그 추가
  console.log("🔍 [refineCategorySub] input tags:", JSON.stringify(tags, null, 2));
  console.log("🔍 [refineCategorySub] input color:", tags.color);
  console.log("🔍 [refineCategorySub] returning result:", JSON.stringify(result, null, 2));
  console.log("🔍 [refineCategorySub] returning color:", result.color);
  
  return result;
}
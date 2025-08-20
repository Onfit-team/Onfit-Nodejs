import { categoryMap, subcategoryMap, colorMap, seasonMap } from "./maps.js";

export function buildPromptFromJson(tags, pattern) {
  const category = categoryMap[tags.category] || "clothing";
  const subKey = `${tags.category}:${tags.subcategory}`;
  const subcategory =
    subcategoryMap[subKey] || tags.subcategoryName || category;

  // ✅ 색상 매핑 로직 단순화
  // 재분석된 색상들: 4=beige, 5=brown, 6=red, 7=pink, 8=orange, 9=yellow
  // 원래 색상들: 1=white, 2=black, 3=gray, 5=navy/blue, 8=green, 9=purple, 10=multi/pattern
  
  const colorMap_new = {
    1: "white", 2: "black", 3: "gray",
    4: "beige", 5: "brown",           // 4→beige, 5→brown (재분석 결과)  
    6: "red", 7: "pink",             // 6→red, 7→pink (재분석 결과)
    8: "orange", 9: "yellow",        // 8→orange, 9→yellow (재분석 결과)
    10: "multi/pattern"
  };
  
  const colorMap_original = {
    1: "white", 2: "black", 3: "gray",
    4: "beige/brown", 5: "navy/blue", 6: "red/pink", 7: "orange/yellow",
    8: "green", 9: "purple", 10: "multi/pattern"
  };
  
  // tags.color에 따라 올바른 매핑 선택
  let color = "";
  if (tags.color === 5 && colorMap[tags.color] === "navy/blue") {
    // 원래 5번이면 navy/blue
    color = "navy/blue";
  } else if (tags.color === 8 && colorMap[tags.color] === "green") {
    // 원래 8번이면 green  
    color = "green";
  } else if (tags.color === 9 && colorMap[tags.color] === "purple") {
    // 원래 9번이면 purple
    color = "purple";
  } else {
    // 나머지는 기본 매핑 또는 재분석된 매핑 사용
    color = colorMap[tags.color] || "";
  }
  
  // 디버깅을 위한 로그
  console.log("🎨 [Color Debug] tags.color:", tags.color);
  console.log("🎨 [Color Debug] colorMap result:", color);

  // ✅ patternDescription을 motif 개수/배치에 따라 더 구체적으로 처리
  let patternDesc = "";
  
  // 1순위: pattern parameter의 patternDescription
  if (pattern?.patternDescription && pattern.patternDescription.trim() !== "") {
    const desc = pattern.patternDescription.toLowerCase();
    
    // plain 관련 설명은 간단히 처리
    if (desc.includes("solid color") || desc.includes("without any discernible patterns") || 
        desc.includes("plain fabric") || pattern.patternType === "plain") {
      patternDesc = "solid fabric";
    }
    // motif인 경우에만 구체적으로 처리
    else if (pattern.patternType === "motif" || desc.includes('motif') || 
             (desc.includes('dog') || desc.includes('cat') || desc.includes('bear') ||
              desc.includes('character') || desc.includes('animal')) && 
             pattern.confidence >= 0.8) { // confidence 체크 추가
      
      const count = pattern.count || 1;
      const layout = pattern.layout || "centered";
      const size = pattern.size || "medium"; // size 정보 가져오기
      
      // size에 따른 설명 조정
      let sizeDesc = "";
      if (size === "small") {
        sizeDesc = "small";
      } else if (size === "large") {
        sizeDesc = "large";
      } else {
        sizeDesc = "medium-sized";
      }
      
      if (count === 1 && (layout === "centered" || layout === "center" || layout === "plain")) {
        patternDesc = `fabric with a ${sizeDesc} ${pattern.patternDescription} positioned in the center`;
      } else if (count >= 5 || layout === "all-over") {
        patternDesc = `fabric with ${pattern.patternDescription} scattered all over in a repeating pattern`;
      } else if (count >= 2 && count <= 4) {
        patternDesc = `fabric with ${count} ${sizeDesc} ${pattern.patternDescription} placed strategically`;
      } else {
        patternDesc = `fabric with ${sizeDesc} ${pattern.patternDescription}`;
      }
    } else {
      patternDesc = "solid fabric";
    }
  }
  // 2순위: tags.pattern의 patternDescription  
  else if (tags.pattern?.patternDescription && tags.pattern.patternDescription.trim() !== "") {
    const desc = tags.pattern.patternDescription.toLowerCase();
    
    if (desc.includes("solid color") || desc.includes("without any discernible patterns") || 
        desc.includes("plain fabric") || tags.pattern.patternType === "plain") {
      patternDesc = "solid fabric";
    }
    else if (tags.pattern.patternType === "motif" || desc.includes('motif') || 
             (desc.includes('dog') || desc.includes('cat') || desc.includes('bear') ||
              desc.includes('character') || desc.includes('animal')) && 
             tags.pattern.confidence >= 0.8) {
      
      const count = tags.pattern.count || 1;
      const layout = tags.pattern.layout || "centered";
      const size = tags.pattern.size || "medium"; // size 정보 가져오기
      
      // size에 따른 설명 조정
      let sizeDesc = "";
      if (size === "small") {
        sizeDesc = "small";
      } else if (size === "large") {
        sizeDesc = "large";
      } else {
        sizeDesc = "medium-sized";
      }
      
      if (count === 1 && (layout === "centered" || layout === "center" || layout === "plain")) {
        patternDesc = `fabric with a ${sizeDesc} ${tags.pattern.patternDescription} positioned in the center`;
      } else if (count >= 5 || layout === "all-over") {
        patternDesc = `fabric with ${tags.pattern.patternDescription} scattered all over in a repeating pattern`;
      } else if (count >= 2 && count <= 4) {
        patternDesc = `fabric with ${count} ${sizeDesc} ${tags.pattern.patternDescription} placed strategically`;
      } else {
        patternDesc = `fabric with ${sizeDesc} ${tags.pattern.patternDescription}`;
      }
    } else {
      patternDesc = "solid fabric";
    }
  }
  // 3순위: patternType 기반
  else if (pattern?.patternType && pattern.patternType !== "plain") {
    patternDesc = `${pattern.patternType} pattern fabric`;
  }
  // 4순위: tags의 patternType
  else if (tags.pattern?.patternType && tags.pattern.patternType !== "plain") {
    patternDesc = `${tags.pattern.patternType} pattern fabric`;
  }
  // fallback
  else {
    patternDesc = "solid fabric";
  }

  // ✅ 디버그 로그 추가
  console.log("🔍 [buildPromptFromJson] pattern parameter:", JSON.stringify(pattern, null, 2));
  console.log("🔍 [buildPromptFromJson] tags.pattern:", JSON.stringify(tags.pattern, null, 2));
  console.log("🔍 [buildPromptFromJson] final patternDesc:", patternDesc);

  // ✅ 색상을 더 강조하여 프롬프트 구성 개선
  let colorDesc = "";
  if (color && color.trim() !== "") {
    // multi/pattern인 경우 처리
    if (color === "multi/pattern") {
      colorDesc = "multicolored";
    }
    // 패턴이 plain이면 색상을 더 강조
    else if (patternDesc.includes("solid color") || pattern?.patternType === "plain") {
      colorDesc = `${color} colored`;
    } else {
      colorDesc = `${color}`;
    }
  } else {
    console.warn("⚠️ No color information available in tags:", tags.color);
  }

  // 기본 설명 구성 - 색상을 더 명확히 포함
  let baseDesc = [colorDesc, subcategory].filter(Boolean).join(" ");
  
  // ✅ 기장 정보가 있으면 subcategory를 더 구체적으로 수정
  if (tags.length && tags.length.length) {
    const lengthDesc = tags.length.length;
    
    if (subcategory === "jeans") {
      if (lengthDesc === "short") baseDesc = [colorDesc, "denim shorts"].filter(Boolean).join(" ");
      else if (lengthDesc === "cropped") baseDesc = [colorDesc, "cropped jeans"].filter(Boolean).join(" ");
      else baseDesc = [colorDesc, "jeans"].filter(Boolean).join(" ");
    }
    else if (subcategory === "skirt") {
      if (lengthDesc === "mini") baseDesc = [colorDesc, "mini skirt"].filter(Boolean).join(" ");
      else if (lengthDesc === "short") baseDesc = [colorDesc, "short skirt"].filter(Boolean).join(" ");
      else if (lengthDesc === "knee") baseDesc = [colorDesc, "knee-length skirt"].filter(Boolean).join(" ");
      else if (lengthDesc === "midi") baseDesc = [colorDesc, "midi skirt"].filter(Boolean).join(" ");
      else if (lengthDesc === "long") baseDesc = [colorDesc, "long skirt"].filter(Boolean).join(" ");
      else baseDesc = [colorDesc, subcategory].filter(Boolean).join(" ");
    }
    else if (subcategory === "training pants") {
      if (lengthDesc === "short") baseDesc = [colorDesc, "training shorts"].filter(Boolean).join(" ");
      else if (lengthDesc === "cropped") baseDesc = [colorDesc, "cropped training pants"].filter(Boolean).join(" ");
      else baseDesc = [colorDesc, "training pants"].filter(Boolean).join(" ");
    }
    else if (subcategory === "leggings") {
      if (lengthDesc === "short") baseDesc = [colorDesc, "short leggings"].filter(Boolean).join(" ");
      else if (lengthDesc === "cropped") baseDesc = [colorDesc, "cropped leggings"].filter(Boolean).join(" ");
      else baseDesc = [colorDesc, "leggings"].filter(Boolean).join(" ");
    }
    
    console.log("👖 [Length Applied] lengthDesc:", lengthDesc, "→ baseDesc:", baseDesc);
  }

  const parts = [
    `A professional e-commerce style product photo of a ${baseDesc}`,
    `made from ${patternDesc}`,
    // ✅ 색상 정확성을 강조하는 부분 추가
    color && color !== "multi/pattern" ? `ensure the ${color} color is accurate and vibrant` : "",
    // ✅ 레이아웃 및 배치 제약사항 강화
    "SINGLE GARMENT ONLY: only one piece of clothing visible",
    "FRONT VIEW ONLY: only the front side visible, no back view, no side view",
    "COMPLETELY FLAT AND SMOOTH: no wrinkles, no creases, no folds, perfectly ironed appearance",
    "PERFECT CENTERING: garment centered in frame, completely within image boundaries",
    "FULL GARMENT VISIBLE: entire clothing item must be fully visible, not cropped or cut off",
    "NO MODELS: absolutely no human models, no mannequins, no dress forms, no hangers",
    "CLEAN BACKGROUND: pure white or light gray background only",
    "FLAT LAY STYLE: garment laid flat as if professionally ironed and positioned",
    "PROFESSIONAL LIGHTING: even, soft lighting with no harsh shadows",
    "PRODUCT CATALOG STYLE: clean, minimal, commercial photography aesthetic",
    "strictly follow the detected pattern and color description",
  ].filter(Boolean); // 빈 문자열 제거

  const prompt = parts.join(", ").replace(/\s+/g, " ").trim();
  
  console.log("🔍 [buildPromptFromJson] color:", color);
  console.log("🔍 [buildPromptFromJson] colorDesc:", colorDesc);
  console.log("🔍 [buildPromptFromJson] final prompt:", prompt);
  
  return prompt;
}
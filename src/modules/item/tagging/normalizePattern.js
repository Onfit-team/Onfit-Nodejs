// 패턴 사전
const patternDict = {
  // stripe 계열
  stripe: "striped",
  striped: "striped",
  stripes: "striped",
  
  // check 계열
  check: "check",
  checked: "check",
  checkered: "check",
  checker: "check",
  checkerboard: "check",
  plaid: "check",
  tartan: "check",
  
  // floral
  floral: "floral",
  flower: "floral",
  flowers: "floral",
  
  // plain
  plain: "plain",
  solid: "plain",
  none: "plain",
  
  // motif: fruit
  strawberry: "strawberry motif",
  grape: "grape motif",
  cherry: "cherry motif",
  lemon: "lemon motif",
  orange: "orange motif",
  banana: "banana motif",
  apple: "apple motif",
  watermelon: "watermelon motif",
  pineapple: "pineapple motif",
  
  // motif: animals
  cat: "cat motif",
  dog: "dog motif",
  tiger: "tiger motif",
  lion: "lion motif",
  penguin: "penguin motif",
  bear: "bear motif",
  rabbit: "rabbit motif",
  deer: "deer motif",
  elephant: "elephant motif",
  
  // motif: characters
  mickey_mouse: "Mickey Mouse motif",
  spongebob: "SpongeBob motif",
  pikachu: "Pikachu motif",
  hello_kitty: "Hello Kitty motif",
  winnie_the_pooh: "Winnie the Pooh motif",
  mario: "Mario motif",
  
  // motif: shapes / objects
  star: "star motif",
  heart: "heart motif",
  diamond_shape: "diamond motif",
  cross: "cross motif",
  moon: "moon motif",
  sun: "sun motif",
  snowflake: "snowflake motif",
  cloud: "cloud motif",
};

/**
 * 패턴 정규화 함수
 * @param {string} patternType - 모델이 감지한 원시 패턴명
 * @param {string} layout - 배치 방식 (ex: horizontal, vertical, all-over)
 * @param {number|string} count - 반복 개수
 * @param {object} opts - 추가 힌트 (ex: dominantColors, hasHorizontalLines)
 */
export function normalizePattern(
  patternType,
  layout = "plain",
  count = 1,
  opts = {}
) {
  let key = patternType?.toLowerCase().trim();
  let normalized = patternDict[key] || key || "plain";

  // ----------------------------------------
  // 0. motif 키워드가 있으면 무조건 motif로 처리
  // ----------------------------------------
  if (key && key.includes('motif')) {
    return {
      patternType: "motif",
      patternName: key,
      layout: layout || "centered",
      count: count > 0 ? count : 1,
    };
  }

  // ----------------------------------------
  // 1. Stripe 보정 (흑백 대비 + 라인 감지)
  // ----------------------------------------
  if (
    (normalized === "plain" || !normalized) &&
    Array.isArray(opts.dominantColors) &&
    opts.dominantColors.length === 2 && // 색상 2개 반복
    (opts.hasHorizontalLines || opts.hasVerticalLines)
  ) {
    normalized = "striped";
    layout = opts.hasHorizontalLines ? "horizontal" : "vertical";
    count = "multi";
  }

  // ----------------------------------------
  // 2. denim/knit류는 무조건 plain 처리
  // ----------------------------------------
  if (["denim", "jean", "knit", "weave"].some((term) => key?.includes(term))) {
    return {
      patternType: "plain",
      patternName: null,
      layout: "plain",
      count: 1,
    };
  }

  // ----------------------------------------
  // 3. plain → name 비움
  // ----------------------------------------
  if (normalized === "plain") {
    return {
      patternType: "plain",
      patternName: null,
      layout: "plain",
      count: 1,
    };
  }

  // ----------------------------------------
  // 4. motif vs 일반 패턴
  // ----------------------------------------
  return {
    patternType: normalized.includes("motif") ? "motif" : normalized,
    patternName: normalized.includes("motif") ? normalized : null,
    layout,
    count: count > 0 ? count : 1,
  };
}
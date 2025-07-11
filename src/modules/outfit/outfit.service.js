// TODO: 나중에 실제 API로 교체
async function getCurrentLocation() {
  // 실제로는 위치 API 호출
  // const location = await locationAPI.getCurrentLocation();
  return {
    id: 1,
    name: "서울시 강남구",
    code: "1168000000"
  };
}

// TODO: 나중에 실제 API로 교체
async function getCurrentWeather(locationId) {
  // 실제로는 날씨 API 호출  
  // const weather = await weatherAPI.getCurrentWeather(locationId);
  return {
    tempAvg: 18.5,
    tempMin: 15.2,
    tempMax: 22.1,
    status: "맑음"
  };
}

export function getFeelsLikeTempOptions() {
  return [
    { id: 1, name: "많이 추움" },
    { id: 2, name: "조금 추움" },
    { id: 3, name: "딱 좋음" },
    { id: 4, name: "조금 더움" },
    { id: 5, name: "많이 더움" }
  ];
}

export function getMoodTags() {
  return [
    { id: 1, name: "캐주얼" },
    { id: 2, name: "스트릿" },
    { id: 3, name: "미니멀" },
    { id: 4, name: "클래식" },
    { id: 5, name: "빈티지" },
    { id: 6, name: "러블리" },
    { id: 7, name: "페미닌" },
    { id: 8, name: "보이시" },
    { id: 9, name: "모던" }
  ];
}

export function getPurposeTags() {
  return [
    { id: 10, name: "데일리" },
    { id: 11, name: "출근룩" },
    { id: 12, name: "데이트룩" },
    { id: 13, name: "나들이룩" },
    { id: 14, name: "여행룩" },
    { id: 15, name: "운동복" },
    { id: 16, name: "하객룩" },
    { id: 17, name: "파티룩" }
  ];
}

export function getAllTags() {
  return {
    mood: getMoodTags(),
    purpose: getPurposeTags()
  };
}

// 임시 ID 카운터
let outfitIdCounter = 1;

export async function createOutfit(outfitData) {
  const { 
    date, 
    mainImage, 
    memo = null,
    feelsLikeTemp = null,
    moodTags = [],
    purposeTags = []
  } = outfitData;
  
  const location = await getCurrentLocation();
  const weather = await getCurrentWeather(location.id);
  
  // 임시 데이터 반환 (DB 저장 없이)
  const outfit = {
    id: outfitIdCounter++,
    userId: 1,
    locationId: location.id,
    date,
    weatherTempAvg: weather.tempAvg,
    mainImage,
    memo,
    moodTags,
    purposeTags,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  return outfit;
  
  // TODO: DB 저장 로직 (나중에 Location, User 데이터 준비 후 활성화)
  /*
  const location = await getCurrentLocation();
  const user = await ensureTestUser();
  const weather = await getCurrentWeather(location.id);
  
  const outfit = await prisma.outfit.create({
    data: {
      userId: user.id,
      locationId: location.id,
      date: new Date(date),
      weatherTempAvg: weather.tempAvg,
      mainImage,
      memo
    }
  });
  
  // 태그 연결
  const allTagIds = [...moodTags, ...purposeTags];
  if (allTagIds.length > 0) {
    await prisma.outfitTag.createMany({
      data: allTagIds.map(tagId => ({
        outfitId: outfit.id,
        tagId
      }))
    });
  }
  
  return {
    ...outfit,
    moodTags,
    purposeTags
  };
  */
}
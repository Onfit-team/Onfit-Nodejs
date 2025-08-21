import { calendarRepository } from './calendar.repository.js';
import { NotExistsError, InvalidInputError } from '../../utils/error.js';
import path from 'path';
import fs from 'fs';

export const getMainImageInfo = async (id, baseUrl) => {
  const outfit = await calendarRepository.findById(id);
  if (!outfit) throw new NotExistsError("해당 Outfit이 없습니다.");

  return {
    id: outfit.id,
    date: outfit.date,
    mainImage: `${baseUrl}/uploads/${id}/${outfit.mainImage}`,
  };
};

export const getMemoInfo = async (id) => {
  const outfit = await calendarRepository.findById(id);
  if (!outfit) throw new NotExistsError("해당 Outfit이 없습니다.");

  return {
    id: outfit.id,
    date: outfit.date,
    memo: outfit.memo,
  };
};

export const modifyOutfit = async (id, update) => {
  const outfit = await calendarRepository.findById(id);
  if (!outfit) throw new NotExistsError("해당 Outfit이 없습니다.");

  const isMemoSame = !update.memo || update.memo === outfit.memo;
  const isImageSame = !update.mainImage || update.mainImage === outfit.mainImage;

  // 수정할 게 없으면 그대로 리턴
  if (isMemoSame && isImageSame) {
    return {
      data: {
        id: outfit.id,
        memo: outfit.memo,
        mainImage: outfit.mainImage
      },
      message: "수정할 데이터가 없습니다."
    };
  }

  if (update.mainImage) {
    const uploadDir = path.join(process.cwd(), 'uploads', String(id));
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  }

  const updated = await calendarRepository.updateById(id, {
    memo: update.memo || outfit.memo,
    mainImage: update.mainImage || outfit.mainImage,
  });

  return {
    data: {
      id: updated.id,
      memo: updated.memo,
      mainImage: updated.mainImage
    },
    message: "코디 수정 성공"
  };
};

export const removeOutfit = async (id) => {
  try {
    console.log('🔍 [Service] removeOutfit 시작, id:', id, 'type:', typeof id);
    
    console.log('🔍 [Service] existsById 호출 전');
    const exists = await calendarRepository.existsById(id);
    console.log('🔍 [Service] outfit 존재 여부:', exists);
    
    if (!exists) {
      console.log('❌ [Service] Outfit이 존재하지 않음');
      throw new NotExistsError("해당 Outfit이 없습니다.");
    }

    console.log('🔍 [Service] 파일 시스템 정리 시작');
    const folderPath = path.join(process.cwd(), 'uploads', String(id));
    console.log('🔍 [Service] 폴더 경로:', folderPath);
    
    if (fs.existsSync(folderPath)) {
      console.log('🔍 [Service] 폴더 존재함, 삭제 진행');
      fs.rmSync(folderPath, { recursive: true, force: true });
      console.log('✅ [Service] 폴더 삭제 완료');
    } else {
      console.log('📁 [Service] 폴더 존재하지 않음');
    }

    console.log('🔍 [Service] DB 삭제 시작');
    const result = await calendarRepository.deleteById(id);
    console.log('✅ [Service] DB 삭제 완료, result:', result);
    
    const response = { detail: `${id}번 Outfit이 삭제되었습니다.` };
    console.log('✅ [Service] removeOutfit 완료, response:', response);
    
    return response;
  } catch (error) {
    console.error('❌ [Service] removeOutfit 에러:', error);
    console.error('❌ [Service] 에러 타입:', error.constructor.name);
    console.error('❌ [Service] 에러 메시지:', error.message);
    console.error('❌ [Service] 에러 스택:', error.stack);
    throw error;
  }
};

export const updateFeelsLikeTemp = async (id, feelsLikeTemp) => {
  const VALID_RANGE = [1, 2, 3, 4, 5];

  if (!VALID_RANGE.includes(feelsLikeTemp)) {
    throw new InvalidInputError("유효하지 않은 체감온도 값입니다.");
  }

  const outfit = await calendarRepository.findById(id);
  if (!outfit) throw new NotExistsError("해당 Outfit이 없습니다.");

  const updated = await calendarRepository.updateById(id, {
    feelsLikeTemp
  });

  return {
    id: updated.id,
    feelsLikeTemp: updated.feelsLikeTemp
  };
};

// 가장 많이 등록된 style 태그 하나만 반환 (없으면 에러)
export const getTopStyleTag = async (userId) => {
  const topTag = await calendarRepository.getTopStyleTag(userId);

  if (!topTag) {
    throw new NotExistsError("등록된 스타일 태그가 없습니다.");
  }

  return {
    tag: topTag.tag,
    count: Number(topTag.count),
  };
};

export const getSortedStyleTags = async (userId) => {
  const tags = await calendarRepository.getSortedStyleTags(userId);
  return tags.map(t => ({
    tag: t.tag,
    count: Number(t.count),
  }));
};

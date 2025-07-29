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

  // ✅ 수정할 게 없으면 그대로 리턴
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
  const exists = await calendarRepository.existsById(id);
  if (!exists) throw new NotExistsError("해당 Outfit이 없습니다.");

  const folderPath = path.join(process.cwd(), 'uploads', String(id));
  if (fs.existsSync(folderPath)) {
    fs.rmSync(folderPath, { recursive: true, force: true });
  }

  await calendarRepository.deleteById(id);
  return { detail: `${id}번 Outfit이 삭제되었습니다.` };
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

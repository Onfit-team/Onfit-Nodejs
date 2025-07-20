import { calendarRepository } from './calendar.repository.js';
import { NotExistsError } from '../../utils/error.js';
import path from 'path';
import fs from 'fs';

// 메인 이미지 정보 반환
export const getMainImageInfo = async (id, baseUrl) => {
  const outfit = await calendarRepository.findById(id);
  if (!outfit) throw new NotExistsError("해당 Outfit이 없습니다.");

  return {
    id: outfit.id,
    date: outfit.date,
    mainImage: `${baseUrl}/uploads/${id}/${outfit.mainImage}`
  };
};

// 메모 정보 반환
export const getMemoInfo = async (id) => {
  const outfit = await calendarRepository.findById(id);
  if (!outfit) throw new NotExistsError("해당 Outfit이 없습니다.");

  return {
    id: outfit.id,
    date: outfit.date,
    memo: outfit.memo
  };
};

// Outfit 수정
export const modifyOutfit = async (id, update) => {
  const outfit = await calendarRepository.findById(id);
  if (!outfit) throw new NotExistsError("해당 Outfit이 없습니다.");

  // 새 이미지 업로드 처리
  if (update.mainImage) {
    const uploadDir = path.join(process.cwd(), 'uploads', String(id));
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    // multer가 파일 저장 처리
  }

  const updated = await calendarRepository.updateById(id, {
    memo: update.memo || outfit.memo,
    mainImage: update.mainImage || outfit.mainImage
  });

  return {
    id: updated.id,
    memo: updated.memo,
    mainImage: updated.mainImage
  };
};

// Outfit 삭제
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

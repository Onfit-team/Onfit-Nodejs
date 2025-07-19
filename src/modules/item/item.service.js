import { itemRepository } from './item.repository.js';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { spawn } from 'child_process';
import {
  CustomError,
  NotExistsError,
  NotAllowedError
} from '../../utils/error.js';

const CATEGORY_MAP = {
  '상의': 0,
  '하의': 1,
  '원피스': 2,
  '아우터': 3,
  '신발': 4,
  '액세서리': 5
};

export const cropAndSave = async (userId, file, baseUrl) => {
  if (!file) throw new CustomError("분석할 이미지가 없습니다.", "Y400", 400);

  // 확장자 보정
  const ext = path.extname(file.originalname);
  const fixedPath = file.path + ext;
  fs.renameSync(file.path, fixedPath);

  const fileName = path.parse(file.originalname).name + '_' + uuidv4().slice(0, 8);
  const resultDir = path.join('cropped', fileName);
  if (!fs.existsSync('cropped')) fs.mkdirSync('cropped', { recursive: true });

  // YOLO predict.py 실행
  await new Promise((resolve, reject) => {
    const pythonPath = process.env.YOLO_PYTHON_PATH || 'python';
    const yolo = spawn(
      pythonPath,
      [
        'predict.py',
        fixedPath,
        path.join('yolo_models', 'best.pt'),
        'cropped',
        fileName
      ]
    );
    yolo.on('close', code => {
      try { fs.unlinkSync(fixedPath); } catch (e) {}
      if (code === 0) resolve();
      else reject(new CustomError("AI 인식에 실패했습니다.", "Y500", 500));
    });
  });

  // 결과 정보
  const original = fixedPath.replace(/\\/g, '/');
  const resultImage = path.join(resultDir, 'detected.jpg').replace(/\\/g, '/');
  const cropFolders = path.join(resultDir, 'crops');
  const crops = [];

  // 크롭 이미지 → DB 저장 (Prisma 스키마 기준!)
  if (fs.existsSync(cropFolders)) {
    const cropClasses = fs.readdirSync(cropFolders);
    for (const cropClass of cropClasses) {
      const classFolder = path.join(cropFolders, cropClass);
      if (fs.existsSync(classFolder)) {
        const files = fs.readdirSync(classFolder).filter(f => /\.(jpg|png)$/i.test(f));
        for (const f of files) {
          const cropId = uuidv4();
          const imagePath = path.join('cropped', fileName, 'crops', cropClass, f).replace(/\\/g, '/');
          const categoryInt = CATEGORY_MAP[cropClass] ?? 0;

          // === DB 저장 ===
          await itemRepository.create({
            userId: userId,
            image: imagePath,
            category: categoryInt,
            subcategory: 0,
            brand: null,
            color: 0,
            size: null,
            season: 0,
            purchaseDate: null,
            isDeleted: false
          });

          crops.push({
            crop_id: cropId,
            category: cropClass,
            path: imagePath
          });
        }
      }
    }
  }

  return { original, resultImage, crops };
};

export const removeItem = async (item_id, userId) => {
  const item = await itemRepository.findById(item_id);
  console.log('item.userId:', item?.userId, typeof item?.userId, 'vs', userId, typeof userId);

  if (!item) throw new NotExistsError("해당 crop_id를 찾을 수 없습니다.", null);
  if (Number(item.userId) !== Number(userId)) throw new NotAllowedError("해당 crop_id에 권한이 없습니다.", null);

  await itemRepository.deleteById(item_id);
  return { cropId: item_id, status: "DELETED" };
};

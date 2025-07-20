import { itemRepository } from './item.repository.js';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { spawn } from 'child_process';
import { CustomError } from '../../utils/error.js';

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

  const ext = path.extname(file.originalname);
  const fixedPath = file.path + ext;
  fs.renameSync(file.path, fixedPath);

  const fileName = path.parse(file.originalname).name + '_' + uuidv4().slice(0, 8);

  await new Promise((resolve, reject) => {
    const pythonPath = process.env.YOLO_PYTHON_PATH || 'python';
    const yolo = spawn(
      pythonPath,
      ['predict.py', fixedPath, path.join('yolo_models', 'best.pt'), 'cropped', fileName]
    );

    yolo.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    yolo.on('close', (code) => {
      fs.unlinkSync(fixedPath);
      if (code === 0) resolve();
      else reject(new CustomError("AI 인식에 실패했습니다.", "Y500", 500));
    });
  });

  const resultImage = path.join('cropped', fileName, 'detected.jpg').replace(/\\/g, '/');
  const cropFolders = path.join('cropped', fileName, 'crops');
  const crops = [];

  if (fs.existsSync(cropFolders)) {
    const cropClasses = fs.readdirSync(cropFolders);
    for (const cropClass of cropClasses) {
      const classFolder = path.join(cropFolders, cropClass);
      const files = fs.readdirSync(classFolder).filter(f => /\.(jpg|png)$/i.test(f));

      for (const f of files) {
        const cropId = uuidv4();
        const imagePath = path.join(classFolder, f).replace(/\\/g, '/');
        const categoryInt = CATEGORY_MAP[cropClass] ?? 0;

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

  return { resultImage, crops };
};

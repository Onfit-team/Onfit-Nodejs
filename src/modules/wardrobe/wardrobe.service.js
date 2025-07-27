//src/modules/wardrobe/wardrobe.service.js
import openai from './openai.js';
import { PrismaClient } from '@prisma/client';
import { wardrobeRepository } from './wardrobe.repository.js';
import { CustomError } from '../../utils/error.js';
import fs from 'fs';

const prisma = new PrismaClient();

export const getAllWardrobeItems = async (userId) => {
  return await prisma.item.findMany({
    where: {
      userId: userId,
      isDeleted: false,
    },
    select: {
      id: true,
      image: true,
    },
    orderBy: {
      id: 'desc',
    },
  });
};

export const getWardrobeItemDetail = async (userId, itemId) => {
  
  const item = await prisma.item.findFirst({
    
    where: {
      id: itemId,
      userId,
      isDeleted: false,
    },
    select: {
      id: true,
      category: true,
      subcategory: true,
      brand: true,
      color: true,
      size: true,
      season: true,
      purchaseDate: true,
      image: true,
    },
  });

  if (!item) {
    throw new CustomError('해당 아이템을 찾을 수 없습니다.', 404, 'NOT_FOUND');
  }
  return item;
};

export const getWardrobeItemsByCategory = async (userId, category, subcategory, itemId) => {
  const where = {
    userId,
    isDeleted: false,
    ...(category !== undefined && category !== null && { category }),
    ...(subcategory !== undefined && subcategory !== null && { subcategory }),
    ...(itemId !== undefined && itemId !== null && { id: itemId }), // ✅ itemId 있을 때만
  };

  return await prisma.item.findMany({
    where,
    select: {
      id: true,
      image: true,
    },
    orderBy: {
      id: 'desc',
    },
  });
};



export const analyzeAndSaveItem = async (imagePath, userId) => {
  const imageBase64 = fs.readFileSync(imagePath).toString('base64');

  const prompt = `
    Look at this clothing image and guess the following fields.
    Give only the numbers. Even if you're unsure, make the most likely guess.

    category: 1~6  
    subcategory: depends on category  
    color: 1~10  
    season: 1~3

    Format:
    category: [number]  
    subcategory: [number]  
    color: [number]  
    season: [number]
    `;

  
  const res = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imageBase64}` } },
        ],
      },
    ],
    max_tokens: 300,
  });

  const content = res.choices[0].message.content;

  // 추출된 숫자 파싱
  const result = {};
  content.split('\n').forEach((line) => {
    const [key, val] = line.split(':').map(s => s.trim());
    result[key] = Number(val);
  });
  console.log('🧠 GPT 추론 결과:', result);
  console.log('📨 GPT 응답 원문:\n', content)
  await wardrobeRepository.createItem({
    userId,
    category: result.category,
    subcategory: result.subcategory,
    color: result.color,
    season: result.season,
    image: imagePath, // s3 업로드 후 URL로 대체 가능
  });

  return result;
};

export const softDeleteItem = async (userId, itemId) => {
  const item = await prisma.item.findUnique({
    where: { id: itemId },
  });

  if (!item || item.isDeleted || item.userId !== userId) {
    throw new CustomError(errorCode.NOT_FOUND, '삭제할 아이템이 없거나 권한이 없습니다.');
  }

  await prisma.item.update({
    where: { id: itemId },
    data: { isDeleted: true },
  });
};

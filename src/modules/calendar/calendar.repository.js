import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();
const { sql } = Prisma;

export const calendarRepository = {
  // Outfit 하나 조회
  async findById(id) {
    return await prisma.outfit.findUnique({
      where: { id: parseInt(id) },
    });
  },

  // 가장 많이 등록된 style 태그 1개만 반환
  async getTopStyleTag(userId) {
    const result = await prisma.$queryRaw`
      SELECT t.name AS tag, COUNT(*) AS count
      FROM OutfitTag ot
      JOIN Outfit o ON ot.outfitId = o.id
      JOIN Tag t ON ot.tagId = t.id
      WHERE o.userId = ${userId}
        AND t.type = 'style'
      GROUP BY t.name
      ORDER BY COUNT(*) DESC, t.name ASC
      LIMIT 1
    `;
    return result[0] || null; // 없으면 null 반환
  },

  // 스타일 태그 전체 통계 (내림차순 + 한글 가나다순 정렬)
  async getSortedStyleTags(userId) {
    return await prisma.$queryRaw`
      SELECT t.name AS tag, COUNT(*) AS count
      FROM OutfitTag ot
      JOIN Outfit o ON ot.outfitId = o.id
      JOIN Tag t ON ot.tagId = t.id
      WHERE o.userId = ${userId}
        AND t.type = 'style'
      GROUP BY t.name
      ORDER BY count DESC, CONVERT(t.name USING utf8) COLLATE utf8_general_ci ASC
    `;
  },

  // Outfit 존재 확인
  async existsById(id) {
    const outfit = await prisma.outfit.findUnique({
      where: { id: parseInt(id) },
    });
    return outfit !== null;
  },

  // Outfit 업데이트
  async updateById(id, data) {
    return await prisma.outfit.update({
      where: { id: parseInt(id) },
      data,
    });
  },

  // Outfit 삭제
  async deleteById(id) {
    return await prisma.outfit.delete({
      where: { id: parseInt(id) },
    });
  },
};

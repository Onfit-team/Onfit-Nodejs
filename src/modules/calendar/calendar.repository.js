import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();
const { sql } = Prisma;

export const calendarRepository = {
  // Outfit 하나 조회
  async findById(id) {
    try {
      console.log('🔍 [Repository] findById 호출, id:', id, 'type:', typeof id);
      const result = await prisma.outfit.findUnique({
        where: { id: parseInt(id) },
      });
      console.log('🔍 [Repository] findById 결과:', result);
      return result;
    } catch (error) {
      console.error('❌ [Repository] findById 에러:', error);
      throw error;
    }
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
    try {
      console.log('🔍 [Repository] deleteById 시작, id:', id, 'type:', typeof id);
      console.log('🔍 [Repository] parseInt(id):', parseInt(id));
      
      const result = await prisma.$transaction(async (tx) => {
        console.log('🔍 [Repository] 트랜잭션 시작');
        
        // 먼저 OutfitTag 테이블의 연관 데이터 삭제
        console.log('🔍 [Repository] OutfitTag 삭제 시작');
        const deletedTags = await tx.outfitTag.deleteMany({
          where: { outfitId: parseInt(id) }
        });
        console.log('✅ [Repository] OutfitTag 삭제 완료, 삭제된 개수:', deletedTags.count);
        
        // 마지막으로 Outfit 삭제
        console.log('🔍 [Repository] Outfit 삭제 시작');
        const deletedOutfit = await tx.outfit.delete({
          where: { id: parseInt(id) }
        });
        console.log('✅ [Repository] Outfit 삭제 완료:', deletedOutfit);
        
        return deletedOutfit;
      });
      
      console.log('✅ [Repository] deleteById 트랜잭션 완료, 최종 결과:', result);
      return result;
    } catch (error) {
      console.error('❌ [Repository] deleteById 에러:', error);
      console.error('❌ [Repository] 에러 코드:', error.code);
      console.error('❌ [Repository] 에러 메타:', error.meta);
      console.error('❌ [Repository] 에러 스택:', error.stack);
      throw error;
    }
  },
};
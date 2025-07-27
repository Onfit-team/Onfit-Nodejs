import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // 기존 태그 삭제
  await prisma.tag.deleteMany({});

  // 태그 데이터 삽입
  const tags = [
    // Mood Tags
    { id: 1, name: '캐주얼', type: 'mood' },
    { id: 2, name: '스트릿', type: 'mood' },
    { id: 3, name: '미니멀', type: 'mood' },
    { id: 4, name: '클래식', type: 'mood' },
    { id: 5, name: '빈티지', type: 'mood' },
    { id: 6, name: '러블리', type: 'mood' },
    { id: 7, name: '페미닌', type: 'mood' },
    { id: 8, name: '보이시', type: 'mood' },
    { id: 9, name: '모던', type: 'mood' },
    
    // Purpose Tags
    { id: 10, name: '데일리', type: 'purpose' },
    { id: 11, name: '출근룩', type: 'purpose' },
    { id: 12, name: '데이트룩', type: 'purpose' },
    { id: 13, name: '나들이룩', type: 'purpose' },
    { id: 14, name: '여행룩', type: 'purpose' },
    { id: 15, name: '운동복', type: 'purpose' },
    { id: 16, name: '하객룩', type: 'purpose' },
    { id: 17, name: '파티룩', type: 'purpose' }
  ];

  for (const tag of tags) {
    await prisma.tag.create({ data: tag });
  }

  console.log('태그 시드 데이터 삽입 완료');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
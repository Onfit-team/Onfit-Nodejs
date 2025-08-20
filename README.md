# Onfit-Nodejs

## 🎯 프로젝트 소개

Onfit은 사용자가 자신의 옷장을 관리하고, 날씨와 상황에 맞는 코디를 추천받을 수 있는 AI 기반 패션 스타일링 플랫폼입니다.


### 주요 기능
- 👕 **아이템 관리**: 카메라/갤러리로 의류 업로드 및 AI 자동 분류
- 🌤️ **날씨 기반 추천**: 실시간 날씨 정보를 활용한 코디 추천
- 👗 **아웃핏 관리**: 개인별 아웃핏 저장 및 공유
- 📅 **캘린더 연동**: 날짜별 코디 기록 및 관리
- 🤖 **AI 활용**:
  
  - **Object Detection: YOLOv8 (Ultralytics)** - 의류 객체 감지 및 분류
    - 상의, 하의, 원피스, 아우터, 신발, 액세서리 6개 카테고리 감지

  - **Background Removal: BRIA AI RMBG-1.4 (HuggingFace)** - 의류 배경 제거
    - 의류만 추출하여 깔끔한 크롭 이미지 생성
  
  - **Image Analysis: OpenAI GPT-4o-mini Vision** - 의류 상세 분석
    - 카테고리, 서브카테고리, 색상, 계절 태깅
    - 패턴 분석 (무늬, 프린트, 모티프 감지)
    - 기장 분석 (스커트, 바지 길이 측정)
    - 애매한 색상 재분석 (베이지/브라운, 레드/핑크, 오렌지/옐로우 구분)
    
  - **Image Generation: OpenAI DALL-E 3** - AI 기반 의류 이미지 생성
    - 분석된 태그 정보를 바탕으로 고품질 상품 이미지 생성
    - 전문적인 e-커머스 스타일 프롬프트 적용
    
  - **Pattern Recognition: OpenAI GPT-4o-mini Vision** - 패턴 및 모티프 인식
    - 동물, 캐릭터, 과일 등 구체적인 모티프 식별
    - 스트라이프, 체크, 플로럴 등 일반 패턴 분류
    - 패턴 배치 및 개수 분석

### 서버 아키텍처 구조
<img width="1086" height="1050" alt="image" src="https://github.com/user-attachments/assets/4a1dc52e-5cc4-4296-a12b-3ddefe8dab5b" />

## 📌 Branch 전략
# Branch	종류
- main	배포용 브랜치 (항상 안정적인 상태 유지, 허가없이 건들지 말기)
- develop	기능 개발 통합 브랜치 (pull request하고 동료들에게 merge요청)
- feature/{이슈번호}{간단한설명}	새로운 기능 개발 브랜치
- fix/{이슈번호}{간단한설명}	버그 수정 브랜치
- hotfix/{이슈번호}{간단한설명}	긴급 수정 브랜치
- refactor/{이슈번호}{간단한설명}	리팩토링 브랜치
- chore/{이슈번호}{간단한설명}	기타 설정, 패키지 변경 등

# Branch    설명
1. 기능개발이 완료된 브랜치는 develop브랜치에 merge합니다.
2. merge된 Branch는 삭제합니다.
</br></br>
✅ 예시
- feature/#12-login-api
- fix/#17-cors-error
- chore/#20-env-setting
</br></br>
✅ Git 사용 규칙

# 커밋 메시지 형식
- #이슈번호 <타입>: <변경 요약> 
</br>
- <타입> 종류</br>
태그 이름	설명</br>
[chore]	코드 수정, 내부 파일 수정</br>
[feat]	새로운 기능 구현</br>
[add]	FEAT 이외의 부수적인 코드 추가, 라이브러리 추가, 새로운 파일 생성</br>
[hotfix]	issue나 QA에서 급한 버그 수정에 사용</br>
[fix]	버그, 오류 해결</br>
[del]	쓸모 없는 코드 삭제</br>
[docs]	README나 WIKI 등의 문서 개정</br>
[correct]	주로 문법의 오류나 타입의 변경, 이름 변경에 사용</br>
[move]	프로젝트 내 파일이나 코드의 이동</br>
[rename]	파일 이름 변경이 있을 때 사용</br>
[improve]	향상이 있을 때 사용</br>
[refactor]	전면 수정이 있을 때 사용</br>
[test]	테스트 코드 추가 시 사용 </br>


## 🛠️ 기술 스택

### Backend
- **Runtime**: Node.js 20
- **Framework**: Express.js 5.1.0
- **Database**: MySQL (Prisma ORM)
- **Cache**: Redis 7
- **File Storage**: AWS S3
- **Authentication**: JWT, Passport.js (Kakao OAuth)

### AI/ML
- **Image Processing**: Sharp, OpenCV
- **Background Removal**: BRIA AI RMBG-1.4
- **Object Detection**: YOLOv8 (Ultralytics)
- **Style Recommendation**: OpenAI GPT-4

### DevOps
- **Container**: Docker
- **CI/CD**: GitHub Actions
- **Deployment**: AWS EC2 (Blue-Green Deployment)
- **Monitoring**: Prometheus Metrics

## 📁 프로젝트 구조

```
Onfit-Nodejs/
├── src/
│   ├── modules/           # 기능별 모듈
│   │   ├── user/         # 사용자 관리
│   │   ├── item/         # 아이템 관리 (AI 감지, 리파인)
│   │   ├── outfit/       # 아웃핏 관리
│   │   ├── wardrobe/     # 옷장 관리 (AI 추천)
│   │   ├── weather/      # 날씨 정보
│   │   ├── location/     # 위치 관리
│   │   ├── calendar/     # 캘린더 관리
│   │   └── community/    # 커뮤니티
│   ├── routes/           # API 라우트
│   ├── middlewares/      # 미들웨어
│   ├── utils/           # 유틸리티
│   └── app.js           # 메인 애플리케이션
├── prisma/              # 데이터베이스 스키마
├── uploads/             # 업로드 파일
├── .github/workflows/   # CI/CD 설정
└── Dockerfile          # Docker 설정

## 👩‍💻팀원 정보

김채연/몽모 (팀장)
장문선/도요
김예빈/그린
장유정/하늘

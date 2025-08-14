FROM node:20-bullseye AS base

# sharp + onnxruntime-node 빌드 의존성 설치
RUN apt-get update --fix-missing && apt-get install -y --no-install-recommends \
    python3 python3-pip build-essential libvips-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# package.json만 복사 후 설치 (캐시 활용)
COPY package*.json ./

# 의존성 설치 (컨테이너 환경 전용 빌드)
# --include=optional : sharp 같은 optional deps 설치
# --force rebuild : 환경 맞춰서 네이티브 재빌드
RUN npm ci --include=optional \
    && npm rebuild sharp --force --include=optional \
    && npm rebuild onnxruntime-node --force --include=optional

# 앱 전체 복사
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]

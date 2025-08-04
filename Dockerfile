# Stage 1: Build dependencies
FROM node:20 AS builder

WORKDIR /build

# 시스템 패키지 설치
RUN apt-get update && apt-get install -y \
    libvips-dev \
    libgl1-mesa-glx \
    python3 \
    python3-pip \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Python 패키지 설치
RUN pip install --break-system-packages ultralytics opencv-python-headless



# Node 의존성 설치
COPY package*.json ./
RUN npm ci --only=production
RUN npm rebuild sharp

# Prisma 클라이언트 생성
COPY prisma ./prisma
RUN npx prisma generate

# Stage 2: Runtime
FROM node:20

WORKDIR /app

# 런타임 의존성 설치
RUN apt-get update && apt-get install -y \
    libvips-dev \
    libgl1-mesa-glx \
    python3 \
    python3-pip \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Python 패키지 설치
RUN pip install --break-system-packages ultralytics opencv-python-headless

# 빌드된 의존성 복사
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /build/node_modules/@prisma ./node_modules/@prisma

# 소스 코드 복사
COPY --from=builder /build/prisma ./prisma
COPY . .

# 포트 노출
EXPOSE 3000

# 서버 실행
CMD ["npm", "start"]
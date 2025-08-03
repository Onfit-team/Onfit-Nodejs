# Stage 1: Build dependencies (node_modules + prisma + sharp)
FROM node:20 AS builder

WORKDIR /build

# 시스템 패키지 설치 (Python + OpenCV + 기타)
RUN apt-get update && apt-get install -y \
    libvips-dev \
    libgl1-mesa-glx \
    python3 \
    python3-pip

# YOLO용 ultralytics 설치 (OpenCV 의존 있음)
RUN pip install --break-system-packages ultralytics

# Node 패키지 설치
COPY package*.json ./
RUN npm install --force --include=optional
RUN npm rebuild sharp

# Prisma 관련
COPY prisma ./prisma
COPY .env .
RUN npx prisma generate

# Stage 2: 실제 실행 이미지
FROM node:20

WORKDIR /app

# 시스템 패키지 재설치 (runtime에도 필요)
RUN apt-get update && apt-get install -y \
    libvips-dev \
    libgl1-mesa-glx \
    python3 \
    python3-pip

# ultralytics 설치 (YOLO)
RUN pip install --break-system-packages ultralytics

# node_modules + Prisma client 복사
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /build/node_modules/@prisma ./node_modules/@prisma

# .env + Prisma + 전체 소스 코드 복사
COPY --from=builder /build/.env .env
COPY --from=builder /build/prisma ./prisma
COPY . .

# 서버 실행
CMD ["npm", "start"]
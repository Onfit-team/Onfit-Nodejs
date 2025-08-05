FROM node:20 AS builder
WORKDIR /build

# 시스템 패키지 설치
RUN apt-get update && apt-get install -y \
    python3 python3-pip python3-venv libvips-dev curl \
    && rm -rf /var/lib/apt/lists/*

# Python 환경 설정
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
RUN pip install --upgrade pip && \
    pip install --no-cache-dir torch torchvision --index-url https://download.pytorch.org/whl/cpu && \
    pip install --no-cache-dir ultralytics opencv-python-headless

# package.json 복사 및 의존성 설치
COPY package*.json ./
RUN npm ci --only=production
RUN npm install sharp --platform=linux --arch=x64

# Prisma 스키마 복사 및 클라이언트 생성
COPY prisma ./prisma
RUN npx prisma generate

# Runtime Stage
FROM node:20
WORKDIR /app

# 런타임 의존성
RUN apt-get update && apt-get install -y \
    python3 libvips-dev curl libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

# Python venv 복사
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Node 의존성 복사
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/prisma ./prisma

# 소스 코드 복사
COPY . .

EXPOSE 3000
CMD ["npm", "start"]

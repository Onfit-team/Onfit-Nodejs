# Stage 1: Build dependencies  
FROM node:20 AS builder

WORKDIR /build

# 시스템 패키지 설치
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    libvips-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# 가상환경 생성 및 활성화
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# pip 업그레이드
RUN pip install --upgrade pip

# 패키지 설치 (안정적인 순서)
RUN pip install --no-cache-dir torch torchvision --index-url https://download.pytorch.org/whl/cpu
RUN pip install --no-cache-dir ultralytics opencv-python-headless

# Node 패키지 설치
COPY package*.json ./
RUN npm ci --only=production
RUN npm rebuild sharp

# Prisma 생성
COPY prisma ./prisma
RUN npx prisma generate

# Stage 2: Runtime
FROM node:20

WORKDIR /app

# 런타임 의존성
RUN apt-get update && apt-get install -y \
    python3 \
    libvips-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Python 가상환경 복사
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Node 의존성 복사
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/prisma ./prisma

# 소스 코드 복사
COPY . .

EXPOSE 3000
CMD ["npm", "start"]

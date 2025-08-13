FROM node:20 AS builder
WORKDIR /build

# 시스템 패키지 설치
RUN apt-get update && apt-get install -y \
    python3 python3-pip python3-venv libvips-dev curl \
    && rm -rf /var/lib/apt/lists/*

# Python 환경 설정
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Python 패키지 설치
RUN pip install --upgrade pip && \
    pip install --no-cache-dir torch torchvision --index-url https://download.pytorch.org/whl/cpu && \
    pip install --no-cache-dir ultralytics opencv-python-headless transformers scikit-image && \
    rm -rf /tmp/pip* && \
    find /opt/venv -name "*.pyc" -delete

# Node.js 의존성 설치
COPY package*.json ./
RUN npm ci --only=production && \
    npm install sharp --platform=linux --arch=x64

# Prisma 스키마 복사 및 클라이언트 생성
COPY prisma ./prisma
RUN npx prisma generate

# ===== Runtime Stage =====
FROM node:20
WORKDIR /app

# 런타임 의존성만 설치
RUN apt-get update && apt-get install -y \
    python3 libvips-dev curl libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

# ✅ Builder에서 Python 환경 복사
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# ✅ Builder에서 Node.js 의존성 복사
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/prisma ./prisma

# 소스 코드 복사
COPY src ./src
COPY package*.json ./
COPY scripts ./scripts

# HuggingFace 캐시 디렉토리 생성
RUN mkdir -p /app/.cache/huggingface && \
    chown -R node:node /app/.cache/huggingface

# 환경변수 설정
ENV HF_HOME=/app/.cache/huggingface
ENV TRANSFORMERS_CACHE=/app/.cache/huggingface

EXPOSE 3000
USER node
CMD ["npm", "start"]

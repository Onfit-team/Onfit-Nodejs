# Multi-stage build로 크기 최적화
FROM node:20-slim as base

# Python 및 시스템 패키지만 설치하는 단계
FROM base as python-deps
WORKDIR /app

# 필수 시스템 패키지만 설치
RUN apt-get update && apt-get install -y \
    python3 python3-pip python3-venv \
    libgl1 libglib2.0-0 \
    build-essential pkg-config libvips-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Python 가상환경 생성
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# PyTorch CPU 버전 (더 작은 사이즈)
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir \
        torch torchvision --index-url https://download.pytorch.org/whl/cpu

# 필수 Python 패키지만 설치
RUN pip install --no-cache-dir \
    ultralytics==8.2.103 \
    transformers==4.44.2 \
    opencv-python-headless==4.8.0.76 \
    pillow==10.0.0 \
    "numpy>=1.24.2,<2.0.0"

# Node.js 의존성 설치 단계
FROM base as node-deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# 최종 이미지
FROM base as final
WORKDIR /app

# 시스템 패키지 (런타임만)
RUN apt-get update && apt-get install -y \
    python3 libgl1 libglib2.0-0 libvips \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Python 환경 복사
COPY --from=python-deps /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Node.js 의존성 복사
COPY --from=node-deps /app/node_modules ./node_modules

# 소스 코드 복사
COPY prisma ./prisma
COPY src ./src
COPY package*.json ./

# Prisma Client 생성
RUN npx prisma generate

# 권한 설정
RUN mkdir -p /app/.cache/huggingface /app/uploads /app/logs && \
    chown -R node:node /app

# 환경변수
ENV HF_HOME=/app/.cache/huggingface
ENV TRANSFORMERS_OFFLINE=0
ENV PYTHONUNBUFFERED=1

EXPOSE 3000
USER node
CMD ["npm", "run", "dev"]
FROM node:20 AS builder
WORKDIR /app

# 시스템 패키지 설치
RUN apt-get update && apt-get install -y \
    python3 python3-pip python3-venv libvips-dev curl libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

# Python 환경 설정
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Python 패키지 설치
RUN pip install --upgrade pip && \
    pip install --no-cache-dir torch torchvision --index-url https://download.pytorch.org/whl/cpu && \
    pip install --no-cache-dir ultralytics opencv-python-headless transformers scikit-image

# ⭐ HuggingFace 캐시 디렉토리 생성 및 모델 다운로드
ENV HF_HOME=/opt/hf_cache
RUN mkdir -p /opt/hf_cache && \
    python -c "from transformers import pipeline; pipeline('image-segmentation', model='briaai/RMBG-1.4', trust_remote_code=True)"

# Node.js 의존성 설치
COPY package*.json ./
RUN npm ci --only=production && \
    npm install sharp --platform=linux --arch=x64

# Prisma 설정
COPY prisma ./prisma
RUN npx prisma generate

# ===== Runtime Stage =====
FROM node:20-slim
WORKDIR /app

# 런타임에 필요한 시스템 패키지만 설치
RUN apt-get update && apt-get install -y \
    python3 libvips libgl1-mesa-glx libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Builder에서 복사
COPY --from=builder /opt/venv /opt/venv
COPY --from=builder /opt/hf_cache /app/.cache/huggingface
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# 소스 코드 복사
COPY package*.json ./
COPY prisma ./prisma
COPY src ./src
COPY scripts ./scripts

# Python 심볼릭 링크
RUN ln -sf /opt/venv/bin/python /usr/local/bin/python3

# 디렉토리 생성 및 권한
RUN mkdir -p /app/uploads /app/logs && \
    chown -R node:node /app

# 환경변수
ENV PATH="/opt/venv/bin:$PATH"
ENV HF_HOME=/app/.cache/huggingface
ENV TRANSFORMERS_CACHE=/app/.cache/huggingface

EXPOSE 3000
USER node
CMD ["npm", "start"]
FROM node:20
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

# Node.js 의존성 설치
COPY package*.json ./
RUN npm ci --only=production && \
    npm install sharp --platform=linux --arch=x64

# Prisma 설정 (빌드 시점에만 실행)
COPY prisma ./prisma
RUN npx prisma generate

# 소스 코드 복사
COPY src ./src
COPY scripts ./scripts

# ✅ 권한 설정 - node 사용자에게 필요한 디렉토리 소유권 부여
RUN mkdir -p /app/.cache/huggingface && \
    chown -R node:node /app/node_modules/.prisma && \
    chown -R node:node /app/.cache/huggingface

# 환경변수 설정
ENV HF_HOME=/app/.cache/huggingface
ENV TRANSFORMERS_CACHE=/app/.cache/huggingface

EXPOSE 3000
USER node
CMD ["npm", "start"]  # ← 이제 prisma generate 없이 실행

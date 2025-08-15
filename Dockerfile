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
    pip install --no-cache-dir ultralytics opencv-python-headless transformers scikit-image diffusers accelerate

# Node.js 의존성 설치
COPY package*.json ./
RUN npm ci --only=production && \
    npm install sharp --platform=linux --arch=x64

# Prisma 설정
COPY prisma ./prisma
RUN npx prisma generate

# 소스 코드 복사
COPY src ./src
COPY scripts ./scripts

# Python 심볼릭 링크
RUN ln -sf /opt/venv/bin/python /usr/local/bin/python3

# ✅ uploads 디렉토리 추가 (권한 문제 해결)
RUN mkdir -p /app/.cache/huggingface /app/uploads /app/logs && \
    chown -R node:node /app/node_modules/.prisma && \
    chown -R node:node /app/.cache/huggingface && \
    chown -R node:node /app/uploads && \
    chown -R node:node /app/logs

# 환경변수 설정
ENV HF_HOME=/app/.cache/huggingface

EXPOSE 3000
USER node
CMD ["npm", "start"]

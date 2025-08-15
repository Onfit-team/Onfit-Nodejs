FROM node:20-slim
WORKDIR /app

# 1. 최소 시스템 패키지만 설치
RUN apt-get update && apt-get install -y \
    python3 python3-pip python3-venv \
    libgl1 libglib2.0-0 curl \
    && rm -rf /var/lib/apt/lists/*

# 2. Python 가상환경 생성
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# 3. ⭐ Python 패키지 설치 (수정됨 - 따로따로 설치)
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir torch torchvision --index-url https://download.pytorch.org/whl/cpu && \
    pip install --no-cache-dir \
        transformers \
        opencv-python-headless \
        pillow \
        numpy

# 4. Node.js 의존성
COPY package*.json ./
RUN npm ci --omit=dev

# 5. Prisma
COPY prisma ./prisma
RUN npx prisma generate

# 6. 소스 코드
COPY src ./src

# 7. Python 심볼릭 링크
RUN ln -sf /opt/venv/bin/python /usr/local/bin/python3

# 8. 디렉토리 생성 및 권한
RUN mkdir -p /app/.cache/huggingface /app/uploads /app/logs && \
    chown -R node:node /app

# 9. 환경변수
ENV HF_HOME=/app/.cache/huggingface
ENV TRANSFORMERS_OFFLINE=0

EXPOSE 3000
USER node
CMD ["node", "src/app.js"]
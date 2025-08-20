FROM node:20-slim

WORKDIR /app

# 1. 시스템 패키지 설치 (sharp + opencv 용 필수 라이브러리 포함)
RUN apt-get update && apt-get install -y \
    python3 python3-pip python3-venv \
    libgl1 libglib2.0-0 curl git \
    build-essential pkg-config libvips-dev \
    && rm -rf /var/lib/apt/lists/*

# 2. Python 가상환경 생성
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# 3. Python 패키지 설치
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir \
        torch torchvision --index-url https://download.pytorch.org/whl/cpu && \
    pip install --no-cache-dir \
        ultralytics==8.2.103 \
        transformers==4.44.2 \
        diffusers \
        accelerate \
        safetensors \
        opencv-python-headless==4.8.0.76 \
        pillow==10.0.0 \
        "numpy>=1.24.2,<2.0.0" \
        onnxruntime==1.18.0 \
        scikit-image \
        huggingface-hub

# 4. RMBG 모델 캐시 미리 다운로드 (최초 빌드 시만 실행)
RUN python -c "from transformers import pipeline; pipeline('image-segmentation', model='briaai/RMBG-1.4', trust_remote_code=True)"

# 5. Node.js 의존성 설치 (devDependencies 포함)
COPY package*.json ./
RUN npm ci

# 6. Prisma Client 생성
COPY prisma ./prisma
RUN npx prisma generate

# 7. 소스 코드 복사
COPY src ./src

# 8. Python 실행 심볼릭 링크
RUN ln -sf /opt/venv/bin/python /usr/local/bin/python3 && \
    ln -sf /opt/venv/bin/python /usr/local/bin/python

# 9. HuggingFace 캐시 디렉토리 권한
RUN mkdir -p /app/.cache/huggingface /app/uploads /app/logs && \
    chown -R node:node /app

# 10. 환경변수
ENV HF_HOME=/app/.cache/huggingface
ENV TRANSFORMERS_OFFLINE=0
ENV PYTHONUNBUFFERED=1

EXPOSE 3000

USER node
CMD ["npm", "run", "dev"]

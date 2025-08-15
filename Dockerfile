FROM node:20
WORKDIR /app

# 1. 시스템 패키지 설치
RUN apt-get update && apt-get install -y \
    python3 python3-pip python3-venv libvips-dev curl libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

# 2. Python 가상환경 설정
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# 3. Python 패키지 설치 (torch CPU, ultralytics, diffusers 포함)
RUN pip install --upgrade pip && \
    pip install --no-cache-dir torch torchvision --index-url https://download.pytorch.org/whl/cpu && \
    pip install --no-cache-dir ultralytics opencv-python-headless transformers scikit-image diffusers accelerate

# 4. Hugging Face 모델 사전 다운로드 (오프라인 실행 대비)
# RMBG 모델
RUN python -c "from transformers import pipeline; pipeline('image-segmentation', model='briaai/RMBG-1.4', trust_remote_code=True)"
# Inpainting 모델
RUN python -c "from diffusers import StableDiffusionInpaintPipeline; StableDiffusionInpaintPipeline.from_pretrained('runwayml/stable-diffusion-inpainting')"

# 5. Node.js 의존성 설치
COPY package*.json ./
RUN npm ci --only=production && \
    npm install sharp --platform=linux --arch=x64

# 6. Prisma 설정
COPY prisma ./prisma
RUN npx prisma generate

# 7. 소스 코드 복사
COPY src ./src
COPY scripts ./scripts

# 8. Python 심볼릭 링크 (node에서 python3 호출 가능하게)
RUN ln -sf /opt/venv/bin/python /usr/local/bin/python3

# 9. Hugging Face 캐시 / 업로드 / 로그 디렉토리 권한 설정
RUN mkdir -p /app/.cache/huggingface /app/uploads /app/logs && \
    chown -R node:node /app/node_modules/.prisma && \
    chown -R node:node /app/.cache/huggingface && \
    chown -R node:node /app/uploads && \
    chown -R node:node /app/logs

# 10. 환경변수
ENV HF_HOME=/app/.cache/huggingface

# 11. 포트 설정 및 실행
EXPOSE 3000
USER node
CMD ["npm", "start"]

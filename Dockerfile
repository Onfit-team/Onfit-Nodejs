# ===========================================
# Base
# ===========================================
FROM node:20-bullseye AS base
RUN apt-get update && apt-get install -y \
    python3 python3-pip python3-venv git libgl1 libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app

# Python venv
RUN python3 -m venv /app/.venv
ENV PATH="/app/.venv/bin:$PATH" \
    HF_HOME=/app/.venv/huggingface

# ===========================================
# Deps
# ===========================================
FROM base AS deps
COPY package*.json ./
RUN npm ci

COPY requirements.txt ./
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir \
      --index-url https://download.pytorch.org/whl/cpu \
      torch torchvision torchaudio && \
    pip install --no-cache-dir -r requirements.txt && \
    python -c "from transformers import pipeline; pipeline('image-segmentation', model='briaai/RMBG-1.4', trust_remote_code=True)" && \
    python -c "from diffusers import StableDiffusionInpaintPipeline; StableDiffusionInpaintPipeline.from_pretrained('runwayml/stable-diffusion-inpainting')"

# ===========================================
# Build
# ===========================================
FROM deps AS build
COPY prisma ./prisma
RUN npx prisma generate
COPY src ./src

# ===========================================
# Runtime
# ===========================================
FROM base AS runtime

# Node deps
COPY --from=deps /app/node_modules ./node_modules

# Python deps & 모델 캐시
COPY --from=deps /app/.venv /app/.venv

# App files
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/src ./src
COPY package*.json ./

# 환경변수
ENV HF_HOME=/app/.venv/huggingface \
    HF_INPAINT_MODEL_PATH=/app/.venv/huggingface/stable-diffusion-inpainting \
    HF_RMBG_MODEL_PATH=/app/.venv/huggingface/models--briaai--RMBG-1.4 \
    PATH="/app/.venv/bin:$PATH"

EXPOSE 3000
CMD ["npm", "run", "dev"]

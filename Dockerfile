FROM node:20 AS builder

WORKDIR /build

RUN apt-get update && apt-get install -y \
    libvips-dev \
    libgl1-mesa-glx \
    python3 \
    python3-pip

RUN pip install --break-system-packages ultralytics

COPY package*.json ./
RUN npm install --force --include=optional
RUN npm rebuild sharp

COPY prisma ./prisma
COPY .env.production .env
RUN npx prisma generate

COPY . .

FROM node:20
WORKDIR /app

RUN apt-get update && apt-get install -y \
    libvips-dev \
    libgl1-mesa-glx \
    python3 \
    python3-pip

RUN pip install --break-system-packages ultralytics

COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /build/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /build/prisma ./prisma
COPY --from=builder /build/.env .env
COPY --from=builder /build/src ./src
COPY --from=builder /build/package*.json ./

CMD ["npm", "start"]

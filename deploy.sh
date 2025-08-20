#!/bin/bash

echo "🚀 Onfit Rolling Update 배포 시작..."

# 기존 컨테이너 중지 및 삭제
echo "📦 기존 컨테이너 정리 중..."
docker stop onfit-backend redis 2>/dev/null || true
docker rm onfit-backend redis 2>/dev/null || true

# 최신 이미지 다운로드
echo "📦 최신 이미지 다운로드 중..."
docker pull kimyebeen125/onfit-nodejs:latest
docker pull redis:7-alpine

# Redis 컨테이너 실행
echo "🔴 Redis 컨테이너 시작 중..."
docker run -d --name redis -p 6379:6379 redis:7-alpine

# 메인 애플리케이션 컨테이너 실행
echo "🟢 Onfit Backend 컨테이너 시작 중..."
docker run -d --name onfit-backend -p 3000:3000 --link redis:redis -e REDIS_URL=redis://redis:6379 --env-file /home/ubuntu/.env kimyebeen125/onfit-nodejs:latest

# 컨테이너 상태 확인
echo "📊 컨테이너 상태 확인 중..."
sleep 10
docker ps

# 헬스체크
echo "🏥 헬스체크 중..."
sleep 15
curl -f http://localhost:3000/health || echo "❌ 헬스체크 실패"

echo "✅ 배포 완료!" 
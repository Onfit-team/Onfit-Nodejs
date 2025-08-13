#!/bin/bash
set -e

echo "📦 모델 캐싱 시작..."

# ===============================
# 1. 필수 패키지 설치 확인 & 설치
# ===============================
echo "🔍 필수 Python 패키지 확인 중..."
pip install --no-cache-dir --upgrade pip

REQUIRED_PKGS=(
    torch
    torchvision
    scikit-image
    transformers
)

for pkg in "${REQUIRED_PKGS[@]}"; do
    if ! python -c "import $pkg" &>/dev/null; then
        echo "📥 $pkg 설치 중..."
        if [[ "$pkg" == "torch" || "$pkg" == "torchvision" ]]; then
            pip install --no-cache-dir --index-url https://download.pytorch.org/whl/cpu $pkg
        else
            pip install --no-cache-dir $pkg
        fi
    else
        echo "✅ $pkg 이미 설치됨"
    fi
done

# ===============================
# 2. 모델 다운로드 (transformers 캐시)
# ===============================
echo "⬇️  briaai/RMBG-1.4 모델 다운로드 중..."
python - <<'EOF'
from transformers import pipeline
print("🔄 RMBG-1.4 모델 캐싱 중...")
pipeline(
    "image-segmentation",
    model="briaai/RMBG-1.4",
    trust_remote_code=True
)
print("✅ 모델 캐싱 완료!")
EOF

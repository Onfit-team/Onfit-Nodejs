import os
import numpy as np
import cv2
from PIL import Image
from transformers import pipeline

# ----------------------------------------------------
# 1. HuggingFace 모델 캐시 경로 지정
# ----------------------------------------------------
hf_home = os.getenv("HF_HOME", "/app/.cache/huggingface")
hf_rmbg_dir = os.getenv(
    "HF_RMBG_MODEL_PATH",
    os.path.join(hf_home, "hub", "models--briaai--RMBG-1.4")
)

# ----------------------------------------------------
# 2. RMBG 모델을 서버 실행 시 한 번만 로드
# ----------------------------------------------------
print("[RMBG] 모델 로딩 시작...")
pipe = pipeline(
    "image-segmentation",
    model=hf_rmbg_dir,
    trust_remote_code=True,
    local_files_only=True,
    use_fast=True,    # 빠른 image processor 사용
    device=-1         # CPU (-1), GPU는 0
)
print("[RMBG] 모델 로딩 완료!")

# ----------------------------------------------------
# 3. 배경 제거 함수
# ----------------------------------------------------
def remove_background(input_path, output_path):
    # RMBG 실행
    rgba = pipe(input_path).convert("RGBA")

    # 알파 채널 추출 및 블러 처리
    alpha = np.array(rgba.split()[-1])
    blurred_alpha = cv2.GaussianBlur(alpha, (11, 11), 0)

    # 최종 RGBA 합성
    np_rgba = np.array(rgba)
    np_rgba[..., 3] = blurred_alpha

    # 투명 처리 마스크
    mask = np_rgba[..., 3] >= 245
    np_rgba[~mask] = (0, 0, 0, 0)

    Image.fromarray(np_rgba, mode="RGBA").save(output_path)

# ----------------------------------------------------
# 4. 메인 실행 (CLI)
# ----------------------------------------------------
if __name__ == "__main__":
    import sys
    if len(sys.argv) != 3:
        print("Usage: python inference_rmbg.py <input> <output>")
        sys.exit(1)

    input_path, output_path = sys.argv[1], sys.argv[2]
    print(f"[RMBG] 입력 파일: {input_path}")
    remove_background(input_path, output_path)
    print(f"[RMBG] 저장 완료: {output_path}")

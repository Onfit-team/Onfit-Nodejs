import os
import numpy as np
import cv2
from PIL import Image
from transformers import pipeline

# Hugging Face 모델 경로
hf_home = os.getenv("HF_HOME") or os.path.join(os.getcwd(), ".venv", "huggingface")
hf_rmbg_dir = os.getenv("HF_RMBG_MODEL_PATH") or os.path.join(hf_home, "hub", "models--briaai--RMBG-1.4")

if not os.path.exists(hf_rmbg_dir):
    raise FileNotFoundError(f"RMBG model not found: {hf_rmbg_dir}")

# 파이프라인 로드
pipe = pipeline(
    "image-segmentation",
    model=hf_rmbg_dir,
    trust_remote_code=True,
    local_files_only=True
)

def remove_background(input_path: str, output_path: str):
    """배경 제거 후 저장"""
    rgba = pipe(input_path).convert("RGBA")
    alpha = np.array(rgba.split()[-1])
    blurred_alpha = cv2.GaussianBlur(alpha, (11, 11), 0)

    np_rgba = np.array(rgba)
    np_rgba[..., 3] = blurred_alpha
    mask = np_rgba[..., 3] >= 245
    np_rgba[~mask] = (0, 0, 0, 0)

    Image.fromarray(np_rgba, mode="RGBA").save(output_path)
    print(f"[OK] Background removed → {output_path}")

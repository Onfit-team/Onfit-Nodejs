import os
import numpy as np
import cv2
from PIL import Image
from diffusers import StableDiffusionInpaintPipeline

# Hugging Face 캐시 경로 설정
hf_home = os.getenv("HF_HOME", "/app/.cache/huggingface")

# Inpainting 모델 로드 (repo_id 기반, 오프라인 모드)
pipe = StableDiffusionInpaintPipeline.from_pretrained(
    "runwayml/stable-diffusion-inpainting",
    cache_dir=hf_home,
    local_files_only=True
)

def inpaint_image(input_path, mask_path, output_path, prompt=""):
    image = Image.open(input_path).convert("RGB")
    mask = Image.open(mask_path).convert("L")

    result = pipe(prompt=prompt, image=image, mask_image=mask).images[0]
    result.save(output_path)

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 4:
        print("Usage: python inference_inpaint.py <input> <mask> <output> [prompt]")
        sys.exit(1)
    inpaint_image(
        sys.argv[1],
        sys.argv[2],
        sys.argv[3],
        sys.argv[4] if len(sys.argv) > 4 else ""
    )

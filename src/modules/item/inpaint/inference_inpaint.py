import os
import torch
from diffusers import StableDiffusionInpaintPipeline
from PIL import Image

# 모델 경로 설정
hf_home = os.getenv("HF_HOME") or os.path.join(os.getcwd(), ".venv", "huggingface")
MODEL_PATH = os.getenv("HF_INPAINT_MODEL_PATH", os.path.join(hf_home, "stable-diffusion-inpainting"))

# 디바이스 선택
device = "cuda" if torch.cuda.is_available() else (
    "mps" if getattr(torch.backends, "mps", None) and torch.backends.mps.is_available() else "cpu"
)

print(f"[INFO] Loading Inpainting model from: {MODEL_PATH}")
print(f"[INFO] Device: {device}")

# 파이프라인 로드
pipe = StableDiffusionInpaintPipeline.from_pretrained(
    MODEL_PATH,
    torch_dtype=torch.float16 if device == "cuda" else torch.float32,
    safety_checker=None,
    local_files_only=True,
    use_safetensors=True
).to(device)

def inpaint_item(image_path: str, mask_path: str, output_path: str, prompt: str = "clean white background"):
    """마스크 부분을 흰 배경으로 보정"""
    image = Image.open(image_path).convert("RGB")
    mask = Image.open(mask_path).convert("RGB")

    result = pipe(prompt=prompt, image=image, mask_image=mask).images[0]
    result.save(output_path)
    print(f"[OK] Inpainted image saved → {output_path}")

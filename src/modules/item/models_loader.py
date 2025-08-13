import os
import torch
from transformers import pipeline, AutoModelForImageSegmentation, AutoProcessor
from diffusers import StableDiffusionInpaintPipeline

# 공통 HuggingFace 캐시 경로 (.venv or /opt/venv)
HF_HOME = os.getenv("HF_HOME") or os.path.join(os.getcwd(), ".venv", "huggingface")
os.makedirs(HF_HOME, exist_ok=True)

HF_RMBG_DIR = os.getenv("HF_RMBG_MODEL_PATH") or os.path.join(HF_HOME, "models--briaai--RMBG-1.4")
HF_INPAINT_DIR = os.getenv("HF_INPAINT_MODEL_PATH") or os.path.join(HF_HOME, "stable-diffusion-inpainting")

rmbg_model, rmbg_processor, inpaint_pipeline = None, None, None


def load_rmbg_model(model_path: str = None):
    """RMBG 모델 로드 (없으면 자동 다운로드)"""
    global rmbg_model, rmbg_processor

    if rmbg_model and rmbg_processor:
        print("⚡ RMBG model already loaded.")
        return rmbg_model, rmbg_processor

    model_path = model_path or HF_RMBG_DIR

    if not os.path.exists(model_path):
        print(f"[INFO] RMBG 모델이 없습니다. 다운로드 중 → {model_path}")
        pipeline("image-segmentation", model="briaai/RMBG-1.4",
                 trust_remote_code=True, cache_dir=HF_HOME)

    print(f"📦 Loading RMBG model from {model_path} ...")
    rmbg_model = AutoModelForImageSegmentation.from_pretrained(model_path)
    rmbg_processor = AutoProcessor.from_pretrained(model_path)
    print("✅ RMBG model loaded successfully.")
    return rmbg_model, rmbg_processor


def load_inpaint_model(model_path: str = None):
    """Stable Diffusion Inpainting 모델 로드 (없으면 자동 다운로드)"""
    global inpaint_pipeline

    if inpaint_pipeline:
        print("⚡ Inpainting model already loaded.")
        return inpaint_pipeline

    model_path = model_path or HF_INPAINT_DIR

    if not os.path.exists(model_path):
        print(f"[INFO] Inpainting 모델이 없습니다. 다운로드 중 → {model_path}")
        StableDiffusionInpaintPipeline.from_pretrained(
            "runwayml/stable-diffusion-inpainting", cache_dir=HF_HOME
        )

    print(f"📦 Loading Inpainting model from {model_path} ...")
    dtype = torch.float16 if torch.cuda.is_available() else torch.float32
    inpaint_pipeline = StableDiffusionInpaintPipeline.from_pretrained(
        model_path, torch_dtype=dtype,
        safety_checker=None, local_files_only=True,
        use_safetensors=True, low_cpu_mem_usage=True
    ).to("cuda" if torch.cuda.is_available() else "cpu")

    print("✅ Inpainting model loaded successfully.")
    return inpaint_pipeline

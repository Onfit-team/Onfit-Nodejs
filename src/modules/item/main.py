from fastapi import FastAPI
from modules.item.rmbg.inference_rmbg import load_rmbg_model
from modules.item.inpaint.inference_inpaint import load_inpaint_model

app = FastAPI()

rmbg_model = None
inpaint_model = None

@app.on_event("startup")
async def warmup():
    global rmbg_model, inpaint_model
    print("🚀 Warming up models...")

    # 미리 로드
    rmbg_model = load_rmbg_model()
    print("✅ RMBG model loaded.")

    inpaint_model = load_inpaint_model()
    print("✅ Inpainting model loaded.")

    print("🎯 All models are ready!")

@app.get("/health")
async def health_check():
    return {"status": "ok"}

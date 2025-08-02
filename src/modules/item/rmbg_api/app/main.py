from fastapi import FastAPI, UploadFile, File
from fastapi.responses import Response
from app.inference import load_model, inference
from io import BytesIO
from PIL import Image
import os
import requests

MODEL_PATH = "app/model.pth"
MODEL_URL = "https://huggingface.co/briaai/RMBG-1.4/resolve/main/model.pth"

def download_model():
    if not os.path.exists(MODEL_PATH):
        print("📦 Downloading model...")
        response = requests.get(MODEL_URL)
        with open(MODEL_PATH, "wb") as f:
            f.write(response.content)

download_model()
MODEL = load_model(MODEL_PATH)

app = FastAPI()

@app.post("/remove_bg")
def remove_bg(file: UploadFile = File(...)):
    image = Image.open(BytesIO(file.file.read()))
    output = inference(MODEL, image)
    buf = BytesIO()
    output.save(buf, format="PNG")
    return Response(content=buf.getvalue(), media_type="image/png")

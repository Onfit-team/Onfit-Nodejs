import os
import torch
from app.briarmbg import BriaRMBG
from app.utilities import preprocess_image, postprocess_image
from PIL import Image
import requests
from tqdm import tqdm

MODEL_PATH = "app/model.pth"
REMOTE_URL = "https://huggingface.co/briaai/RMBG-1.4/resolve/main/model.pth"

def download_model_if_needed():
    if not os.path.exists(MODEL_PATH):
        print("🔄 model.pth 파일이 없어 다운로드합니다...")
        response = requests.get(REMOTE_URL, stream=True)
        response.raise_for_status()

        total = int(response.headers.get('content-length', 0))
        with open(MODEL_PATH, 'wb') as file, tqdm(
            desc="Downloading model.pth",
            total=total,
            unit='B',
            unit_scale=True,
            unit_divisor=1024,
        ) as bar:
            for chunk in response.iter_content(chunk_size=8192):
                file.write(chunk)
                bar.update(len(chunk))

def load_model(path=MODEL_PATH):
    download_model_if_needed()
    model = BriaRMBG()
    model.load_state_dict(torch.load(path, map_location='cpu'))
    model.eval()
    return model

def inference(model, input_image: Image.Image):
    tensor = preprocess_image(input_image)
    with torch.no_grad():
        result = model(tensor)
    mask = result['pha']
    return postprocess_image(mask)

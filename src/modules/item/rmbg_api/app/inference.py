import torch
from PIL import Image
from app.briarmbg import BriaRMBG
from app.utilities import preprocess_image, postprocess_image

MODEL_PATH = "app/model.pth"

def load_model(path=MODEL_PATH):
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

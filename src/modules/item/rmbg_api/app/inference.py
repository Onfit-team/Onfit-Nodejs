from app.briarmbg import BriaRMBG
from app.utilities import preprocess_image, postprocess_image
from PIL import Image

model = BriaRMBG.from_pretrained("briaai/RMBG-1.4")

def remove_background(input_image: Image.Image):
    tensor = preprocess_image(input_image)
    with torch.no_grad():
        result = model(tensor)
    mask = result['pha']
    return postprocess_image(mask)

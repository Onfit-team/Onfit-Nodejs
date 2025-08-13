import numpy as np
import torch
from PIL import Image
import cv2

def preprocess_image(image: Image.Image):
    im = np.array(image).astype(np.float32)
    if im.shape[2] == 4:
        im = im[:, :, :3]
    im = im / 127.5 - 1.0
    im = np.transpose(im, (2, 0, 1))
    return torch.from_numpy(im).unsqueeze(0)

def postprocess_image(mask: torch.Tensor):
    mask = mask.squeeze().cpu().numpy()
    mask = (mask - mask.min()) / (mask.max() - mask.min() + 1e-8)
    mask = (mask * 255).astype(np.uint8)
    return Image.fromarray(mask)

import os
import numpy as np
import cv2
from PIL import Image
from transformers import pipeline

hf_home = os.getenv("HF_HOME", "/app/.cache/huggingface")
hf_rmbg_dir = os.getenv("HF_RMBG_MODEL_PATH", os.path.join(hf_home, "hub", "models--briaai--RMBG-1.4"))

pipe = pipeline("image-segmentation", model=hf_rmbg_dir, trust_remote_code=True, local_files_only=True)

def remove_background(input_path, output_path):
    rgba = pipe(input_path).convert("RGBA")
    alpha = np.array(rgba.split()[-1])
    blurred_alpha = cv2.GaussianBlur(alpha, (11, 11), 0)

    np_rgba = np.array(rgba)
    np_rgba[..., 3] = blurred_alpha
    mask = np_rgba[..., 3] >= 245
    np_rgba[~mask] = (0, 0, 0, 0)

    Image.fromarray(np_rgba, mode="RGBA").save(output_path)

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 3:
        print("Usage: python inference_rmbg.py <input> <output>")
        sys.exit(1)
    remove_background(sys.argv[1], sys.argv[2])

import sys
import os
import torch
from PIL import Image
from skimage import io
import torch.nn.functional as F
from torchvision.transforms.functional import normalize
from transformers import AutoModelForImageSegmentation

# ========== 모델 최초 로드 ==========
MODEL_NAME = "briaai/RMBG-1.4"
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
print(f"[RMBG] Loading model on {device}...")
model = AutoModelForImageSegmentation.from_pretrained(
    MODEL_NAME, trust_remote_code=True
).to(device)
print("[RMBG] Model loaded.")

# ========== 전처리 / 후처리 ==========
def preprocess_image(im, model_input_size):
    if len(im.shape) < 3:
        im = im[:, :, None]
    im_tensor = torch.tensor(im, dtype=torch.float32).permute(2, 0, 1)
    im_tensor = F.interpolate(im_tensor.unsqueeze(0), size=model_input_size, mode="bilinear")
    image = torch.divide(im_tensor, 255.0)
    image = normalize(image, [0.5, 0.5, 0.5], [1.0, 1.0, 1.0])
    return image

def postprocess_image(result, im_size):
    result = torch.squeeze(F.interpolate(result, size=im_size, mode='bilinear'), 0)
    ma, mi = torch.max(result), torch.min(result)
    result = (result - mi) / (ma - mi)
    im_array = (result * 255).permute(1, 2, 0).cpu().numpy().astype("uint8")
    return im_array.squeeze()

# ========== 실행 ==========
if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python remove_bg.py <input_path> <output_path>")
        sys.exit(1)

    input_path, output_path = sys.argv[1], sys.argv[2]

    # 원본 로드
    orig_im = io.imread(input_path)
    orig_size = orig_im.shape[:2]

    # 전처리
    model_input_size = [1024, 1024]
    image = preprocess_image(orig_im, model_input_size).to(device)

    # 추론
    with torch.no_grad():
        result = model(image)

    # 후처리
    mask = postprocess_image(result[0][0], orig_size)
    pil_mask = Image.fromarray(mask)

    # 배경 제거
    orig_image = Image.open(input_path).convert("RGBA")
    orig_image.putalpha(pil_mask)

    # 저장
    orig_image.save(output_path, "PNG")
    print(f"[RMBG] Saved result to {output_path}")

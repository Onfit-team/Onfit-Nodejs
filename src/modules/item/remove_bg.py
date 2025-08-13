from transformers import pipeline
from PIL import Image
import sys
import numpy as np
import cv2

# 인자: 입력 경로, 출력 경로
input_path = sys.argv[1]
output_path = sys.argv[2]

# Hugging Face pipeline 로드
pipe = pipeline("image-segmentation", model="briaai/RMBG-1.4", trust_remote_code=True)

# 배경 제거 수행 (PIL.Image 반환)
rgba = pipe(input_path).convert("RGBA")

# 알파 채널 추출 및 soft feather 적용
alpha = rgba.split()[-1]
np_alpha = np.array(alpha)

# feather: Gaussian blur 적용 (커널 사이즈는 짧을수록 선명, 클수록 부드러움)
blurred = cv2.GaussianBlur(np_alpha, (11, 11), 0)

# 알파 채널 교체
np_rgba = np.array(rgba)
np_rgba[..., 3] = blurred

# 완전 불투명 외에는 제거 (threshold로 옷 외 배경 완전 제거)
for y in range(np_rgba.shape[0]):
    for x in range(np_rgba.shape[1]):
        if np_rgba[y, x, 3] < 254:
            np_rgba[y, x] = (0, 0, 0, 0)

# 저장
result = Image.fromarray(np_rgba, mode="RGBA")
result.save(output_path)

# src/modules/item/segment_category.py
import sys
import json
import numpy as np
from PIL import Image
import cv2
from transformers import pipeline

if len(sys.argv) < 5:
    sys.stderr.write("Usage: python segment_category.py <cutPath> <maskPath> <maskBBoxPath> <bboxJson>\n")
    exit(1)

cut_path, mask_path, mask_bbox_path, bbox_json = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]

# bbox 좌표
bbox = json.loads(bbox_json)  # [x1, y1, x2, y2]

# ✅ RMBG 모델 사용 (브리아이 / 옷 전용 배경제거 모델)
pipe = pipeline("image-segmentation", model="briaai/RMBG-1.4", trust_remote_code=True)

# 입력 이미지 열기
image = Image.open(cut_path).convert("RGB")
width, height = image.size

# 모델 추론 (RMBG → foreground alpha)
rgba = pipe(image).convert("RGBA")
alpha = np.array(rgba.split()[-1], dtype=np.uint8)

# cloth mask 생성 (세그멘테이션 기반)
mask = np.zeros((height, width), dtype=np.uint8)
mask[alpha > 100] = 255

# bbox 영역 내부만 유지
x1, y1, x2, y2 = map(int, bbox)
cropped = np.zeros_like(mask)
cropped[y1:y2, x1:x2] = mask[y1:y2, x1:x2]

# 이진화
_, mask_bin = cv2.threshold(cropped, 127, 255, cv2.THRESH_BINARY)

# cloth mask 저장
mask_rgba = np.zeros((height, width, 4), dtype=np.uint8)
mask_rgba[mask_bin > 0] = [255, 255, 255, 255]
Image.fromarray(mask_rgba).save(mask_path)

# bbox mask 저장 (fallback 용)
bbox_mask = np.zeros((height, width, 4), dtype=np.uint8)
bbox_mask[y1:y2, x1:x2] = [255, 255, 255, 255]
Image.fromarray(bbox_mask).save(mask_bbox_path)

print(f"[DONE] Saved masks: {mask_path}, {mask_bbox_path}")

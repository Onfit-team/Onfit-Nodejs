import sys
import json
from ultralytics import YOLO
from PIL import Image
import numpy as np

if len(sys.argv) < 3:
    sys.stderr.write("Usage: python predict_v8.py <model_path> <image_path>\n")
    exit(1)

model_path = sys.argv[1]
image_path = sys.argv[2]

try:
    model = YOLO(model_path)
except Exception as e:
    sys.stderr.write(f"[모델 로딩 오류]: {str(e)}\n")
    exit(1)

try:
    results = model(image_path)[0]
    classes = model.names
except Exception as e:
    sys.stderr.write(f"[예측 실패]: {str(e)}\n")
    exit(1)

output = []

for box in results.boxes:
    xyxy = box.xyxy[0].tolist()
    class_id = int(box.cls[0])
    output.append({
        "class": classes[class_id],
        "bbox": xyxy
    })

sys.stdout.write(json.dumps(output, ensure_ascii=False))

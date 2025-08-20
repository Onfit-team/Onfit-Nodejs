import sys
import json
from ultralytics import YOLO

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
    classes = model.names  # ex) {0: 'top', 1: 'bottom', ...}
except Exception as e:
    sys.stderr.write(f"[예측 실패]: {str(e)}\n")
    exit(1)

# YOLO 클래스명 → 한글 카테고리 맵핑
category_map = {
    "top": "상의",
    "bottom": "하의",
    "one-piece": "원피스",
    "outerwear": "아우터",
    "shoes": "신발",
    "accessory": "액세서리",
}

output = []

for box in results.boxes:
    xyxy = box.xyxy[0].tolist()
    class_id = int(box.cls[0])
    eng_class = classes[class_id]
    kor_class = category_map.get(eng_class, "unknown")

    output.append({
        "label": class_id,       # 🔥 숫자 라벨 추가
        "eng_class": eng_class,  # (옵션) 영문 카테고리
        "category": kor_class,   # 한글 카테고리
        "bbox": xyxy
    })

# 반드시 한 줄 JSON 출력
sys.stdout.write(json.dumps(output, ensure_ascii=False))

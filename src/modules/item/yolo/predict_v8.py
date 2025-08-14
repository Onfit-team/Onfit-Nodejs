import sys
import json
from ultralytics import YOLO

if len(sys.argv) != 3:
    print(json.dumps({"error": "Usage: python predict_v8.py <model_path> <image_path>"}))
    sys.exit(1)

model_path = sys.argv[1]
image_path = sys.argv[2]

try:
    model = YOLO(model_path)
    results = model(image_path, verbose=False)

    detections = []
    for result in results:
        boxes = result.boxes
        names = result.names
        for box in boxes:
            xyxy = box.xyxy[0].tolist()
            cls_id = int(box.cls[0])
            label = names.get(cls_id, str(cls_id))
            detections.append({"label": label, "bbox": xyxy})

    print(json.dumps(detections, ensure_ascii=False))

except Exception as e:
    print(json.dumps({"error": str(e)}))
    sys.exit(1)

from ultralytics import YOLO
import sys, json, io
from PIL import Image

if len(sys.argv) < 2:
    sys.stderr.write('Usage: python predict.py <model_path>\n')
    exit(1)

model_path = sys.argv[1]
model = YOLO(model_path, task='detect')

try:
    img_data = sys.stdin.buffer.read()
    img = Image.open(io.BytesIO(img_data)).convert('RGB')
except Exception as e:
    sys.stderr.write(f'[이미지 로딩 오류]: {str(e)}\n')
    exit(1)

results = model.predict(img, save=False, verbose=False)

data = []
for box in results[0].boxes:
    cls = results[0].names[int(box.cls)]
    xyxy = box.xyxy.tolist()[0]
    data.append({ 'class': cls, 'bbox': xyxy })

sys.stdout.write(json.dumps(data, ensure_ascii=False))

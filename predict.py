from ultralytics import YOLO
import sys

if len(sys.argv) < 5:
    print('Usage: python predict.py <image_path> <model_path> <project> <name>')
    exit(1)

image_path, model_path, project, name = sys.argv[1:5]

model = YOLO(model_path)
results = model(
    image_path,
    save=True,           # 박스그려진 전체 이미지 저장 (반드시 추가!)
    save_txt=True,
    save_crop=True,
    project=project,
    name=name,
    exist_ok=True
)


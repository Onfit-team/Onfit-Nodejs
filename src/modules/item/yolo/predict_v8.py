import sys, json, warnings, os, logging, inspect
import torch
from ultralytics import YOLO
import ultralytics.nn.modules as yolo_modules
import ultralytics.nn.tasks as yolo_tasks
import torch.nn as torch_nn

# --- YOLO 관련 클래스 안전 등록 ---
safe_classes = set()
for _, obj in inspect.getmembers(torch_nn):
    if inspect.isclass(obj):
        safe_classes.add(obj)
for _, obj in inspect.getmembers(yolo_modules):
    if inspect.isclass(obj):
        safe_classes.add(obj)
for _, obj in inspect.getmembers(yolo_tasks):
    if inspect.isclass(obj):
        safe_classes.add(obj)

torch.serialization.add_safe_globals(list(safe_classes))

# --- 경로/로깅 설정 ---
os.environ.setdefault("YOLO_CONFIG_DIR", "/tmp")
os.environ.setdefault("ULTRALYTICS_SETTINGS", "/tmp/Ultralytics/settings.json")
warnings.filterwarnings("ignore")
logging.getLogger("ultralytics").setLevel(logging.ERROR)

# --- 인자 확인 ---
if len(sys.argv) < 3:
    sys.stderr.write("Usage: python predict_v8.py <model_path> <image_path>\n")
    sys.exit(1)

model_path, image_path = sys.argv[1], sys.argv[2]

# --- 모델 로드 ---
try:
    model = YOLO(model_path, task="detect")
except Exception as e:
    sys.stderr.write(f"[모델 로딩 오류]: {str(e)}\n")
    sys.exit(1)

# --- 예측 ---
try:
    results = model(image_path, verbose=False)[0]
    classes = model.names
except Exception as e:
    sys.stderr.write(f"[예측 실패]: {str(e)}\n")
    sys.exit(1)

# --- 결과 변환 ---
output = []
for box in results.boxes:
    xyxy = [float(x) for x in box.xyxy[0].tolist()]
    class_id = int(box.cls[0])
    output.append({"class": classes[class_id], "bbox": xyxy})

# --- 출력 ---
sys.stdout.write(json.dumps(output, ensure_ascii=False))
sys.stdout.flush()

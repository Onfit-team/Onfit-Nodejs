import sys, torch, json, io, numpy as np, cv2
from PIL import Image
from pathlib import Path

# YOLOv5 내부 모듈 경로 추가
sys.path.append(str(Path(__file__).parent / "yolov5"))

# 필요한 클래스 및 함수 등록
from torch.serialization import add_safe_globals
from torch.nn import Sequential, Conv2d, BatchNorm2d, SiLU, MaxPool2d, Upsample, ModuleList
from models.yolo import DetectionModel, Detect
from models.common import Conv, C3, Bottleneck, SPPF, Concat
from utils.general import non_max_suppression

# 안전 등록 (PyTorch 2.6 이상 대응)
add_safe_globals([
    DetectionModel, Detect, Sequential, Conv2d, BatchNorm2d, SiLU,
    MaxPool2d, Upsample, ModuleList, Conv, C3, Bottleneck, SPPF, Concat
])

# scale_coords 정의
def scale_coords(img1_shape, coords, img0_shape, ratio_pad=None):
    if ratio_pad is None:
        gain = min(img1_shape[0] / img0_shape[0], img1_shape[1] / img0_shape[1])
        pad = ((img1_shape[1] - img0_shape[1] * gain) / 2, (img1_shape[0] - img0_shape[0] * gain) / 2)
    else:
        gain = ratio_pad[0][0]
        pad = ratio_pad[1]
    coords[:, [0, 2]] -= pad[0]
    coords[:, [1, 3]] -= pad[1]
    coords[:, :4] /= gain
    coords[:, :4] = coords[:, :4].clamp(min=0)
    return coords

# letterbox 정의
def letterbox(im, new_shape=(640, 640), color=(114, 114, 114)):
    shape = im.shape[:2]
    r = min(new_shape[0] / shape[0], new_shape[1] / shape[1])
    new_unpad = (int(round(shape[1] * r)), int(round(shape[0] * r)))
    dw, dh = new_shape[1] - new_unpad[0], new_shape[0] - new_unpad[1]
    dw /= 2
    dh /= 2
    im = cv2.resize(im, new_unpad, interpolation=cv2.INTER_LINEAR)
    top, bottom = int(round(dh - 0.1)), int(round(dh + 0.1))
    left, right = int(round(dw - 0.1)), int(round(dw + 0.1))
    im = cv2.copyMakeBorder(im, top, bottom, left, right, cv2.BORDER_CONSTANT, value=color)
    return im

# 모델 경로 인자 체크
if len(sys.argv) < 2:
    sys.stderr.write('Usage: python predict.py <model_path>\n')
    exit(1)

model_path = sys.argv[1]

# 모델 로딩
try:
    print("Loading model...", file=sys.stderr)
    model = torch.load(model_path, map_location='cpu')
    model.eval()
    names = model.names if hasattr(model, 'names') else model.module.names
    print("Model loaded successfully", file=sys.stderr)
except Exception as e:
    sys.stderr.write(f'[모델 로딩 오류]: {str(e)}\n')
    exit(1)

# 이미지 로딩
try:
    print("Reading image from stdin...", file=sys.stderr)
    img_data = sys.stdin.buffer.read()
    img = Image.open(io.BytesIO(img_data)).convert('RGB')
    img0 = np.array(img)
except Exception as e:
    sys.stderr.write(f'[이미지 로딩 오류]: {str(e)}\n')
    exit(1)

# 전처리 및 예측
try:
    img = letterbox(img0, new_shape=640)
    img = img[:, :, ::-1].transpose(2, 0, 1)
    img = np.ascontiguousarray(img)

    img_tensor = torch.from_numpy(img).float() / 255.0
    if img_tensor.ndimension() == 3:
        img_tensor = img_tensor.unsqueeze(0)

    with torch.no_grad():
        pred = model(img_tensor)[0]

    pred = non_max_suppression(pred, 0.25, 0.45)

    results = []
    for det in pred:
        if det is not None and len(det):
            det[:, :4] = scale_coords(img_tensor.shape[2:], det[:, :4], img0.shape).round()
            for *xyxy, conf, cls in det.tolist():
                results.append({
                    'class': names[int(cls)],
                    'bbox': xyxy
                })

    sys.stdout.write(json.dumps(results, ensure_ascii=False))
except Exception as e:
    sys.stderr.write(f'[예측 실패]: {str(e)}\n')
    exit(1)

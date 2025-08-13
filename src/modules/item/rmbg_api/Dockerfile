FROM python:3.10-slim

WORKDIR /app

# PyTorch, torchvision 설치 (CPU 버전)
RUN pip install --default-timeout=100 torch torchvision --index-url https://download.pytorch.org/whl/cpu

# requirements.txt 복사 후 의존성 설치
COPY ./requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# 앱 코드 복사
COPY ./app /app/app

EXPOSE 7860
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]

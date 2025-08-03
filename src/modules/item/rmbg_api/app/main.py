from fastapi import FastAPI, UploadFile, File
from fastapi.responses import Response
from app.inference import load_model, inference
from io import BytesIO
from PIL import Image


app = FastAPI()

MODEL = load_model("app/model.pth")

@app.post("/remove_bg")
def remove_bg(file: UploadFile = File(...)):
    image = Image.open(BytesIO(file.file.read()))
    output = inference(MODEL, image)

    buf = BytesIO()
    output.save(buf, format="PNG")
    return Response(content=buf.getvalue(), media_type="image/png")

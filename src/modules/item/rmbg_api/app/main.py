from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from app.inference import inference, load_model
from PIL import Image
<<<<<<< Updated upstream


app = FastAPI()

MODEL = load_model("app/model.pth")

@app.post("/remove_bg")
def remove_bg(file: UploadFile = File(...)):
    image = Image.open(BytesIO(file.file.read()))
    output = inference(MODEL, image)

    buf = BytesIO()
    output.save(buf, format="PNG")
    return Response(content=buf.getvalue(), media_type="image/png")
=======
import io
import base64

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = load_model()

@app.post("/remove_bg")
async def remove_bg(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    output = inference(model, image)

    buffered = io.BytesIO()
    output.save(buffered, format="PNG")
    img_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")

    return {"image": img_base64}
>>>>>>> Stashed changes

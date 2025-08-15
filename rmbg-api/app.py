from fastapi import FastAPI, UploadFile, File
from fastapi.responses import Response, JSONResponse
from rembg import remove, new_session
from PIL import Image
import io, time

app = FastAPI(title="RMBG API")

# 모델 사전 로드
session = new_session("u2net")

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/rmbg")
async def rmbg(file: UploadFile = File(...)):
    t0 = time.time()
    raw = await file.read()

    try:
        Image.open(io.BytesIO(raw)).verify()
    except Exception as e:
        return JSONResponse({"error": f"invalid image: {e}"}, status_code=400)

    out_bytes = remove(raw, session=session)
    dt = round((time.time() - t0) * 1000)

    return Response(
        content=out_bytes,
        media_type="image/png",
        headers={
            "X-RMBG-Latency-MS": str(dt),
            "Content-Disposition": 'inline; filename="result.png"',
        },
    )

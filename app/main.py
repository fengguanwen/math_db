from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
import json

app = FastAPI()

# 静态文件目录
app.mount("/static", StaticFiles(directory="static"), name="static")

# 读取数学题数据
data_file = Path("data/math-questions.json")
try:
    with data_file.open(encoding="utf-8") as f:
        math_questions = json.load(f)
except Exception as e:
    print(f"Error loading math questions: {e}")
    math_questions = []

@app.get("/api/math-questions")
async def get_math_questions():
    if not math_questions:
        raise HTTPException(status_code=500, detail="Math questions data not loaded")
    return math_questions

@app.get("/")
async def read_index():
    return FileResponse("static/index.html", media_type="text/html")

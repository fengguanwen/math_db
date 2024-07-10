from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import schemas, crud, database

router = APIRouter()

@router.get("/api/math-questions", response_model=list[schemas.MathQuestion])
def read_math_questions(db: Session = Depends(database.get_db)):
    questions = crud.get_math_questions(db)
    return questions

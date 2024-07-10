from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class MathQuestionBase(BaseModel):
    question: str
    options: list[str]
    answer: str
    category: str

class MathQuestionCreate(MathQuestionBase):
    pass

class MathQuestion(MathQuestionBase):
    id: int

    class Config:
        orm_mode = True

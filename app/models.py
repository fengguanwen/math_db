from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class MathQuestion(Base):
    __tablename__ = 'math_questions'
    id = Column(Integer, primary_key=True, index=True)
    question = Column(String, index=True)
    options = Column(String)
    answer = Column(String)
    category = Column(String)

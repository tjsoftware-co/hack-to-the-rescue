from datetime import datetime

from models import Grade
from pydantic import BaseModel


class Prompt(BaseModel):
    id: int
    source_text: str
    output_text: str
    grade: Grade

    class Config:
        orm_mode = True


class Article(BaseModel):
    id: int
    url: int
    return_code: int
    created_at: datetime

    prompts = list[Prompt]

    class Config:
        orm_mode = True

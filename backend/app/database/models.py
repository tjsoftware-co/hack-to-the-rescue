from datetime import datetime
from enum import Enum

from database.config import Base
from sqlalchemy import Column, DateTime
from sqlalchemy import Enum as SQLAlchemyEnum
from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import relationship


class Grade(Enum):
    A = "A"
    B = "B"
    C = "C"
    D = "D"
    E = "E"
    F = "F"
    UNRANKED = "UNRANKED"


class Article(Base):
    __tablename__ = "article"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String, index=True)
    return_code = Column(Integer, default=200)
    created_at = Column(DateTime, default=datetime.utcnow)

    prompts = relationship("Prompt", back_populates="article")


class Prompt(Base):
    __tablename__ = "prompt"

    id = Column(Integer, primary_key=True, index=True)
    source_text = Column(String)
    output_text = Column(String)

    grade = Column(SQLAlchemyEnum(Grade), nullable=False, default=Grade.UNRANKED, index=True)

    article_id = Column(Integer, ForeignKey("article.id"))
    article = relationship("Article", back_populates="prompts")

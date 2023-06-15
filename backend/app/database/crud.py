from database import models
from sqlalchemy.orm import Session


def get_article_by_url(db: Session, article_url: str):
    return db.query(models.Article).filter(models.Article.url == article_url).first()


def get_article_by_id(db: Session, article_id: int):
    return db.query(models.Article).filter(models.Article.url == article_id).first()


def get_prompts_for_article(db: Session, article_id: int):
    return db.query(models.Prompt).filter(models.Article.id == article_id).all()

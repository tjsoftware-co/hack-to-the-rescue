import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .articles import views as articles_views
from .prompts import views as prompt_views
from .settings import settings

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def include_router(app):
    """
    :type app: fastapi.applications.FastAPI
    :rtype: None
    """
    app.include_router(articles_views.router)
    app.include_router(prompt_views.router)


def start_application():
    """
    :rtype: fastapi.applications.FastAPI
    """
    app = FastAPI(title=settings.project_name, version=settings.project_version)
    include_router(app)
    return app


app = start_application()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

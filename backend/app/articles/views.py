import re

from fastapi import APIRouter
from pydantic import BaseModel

from .find_theses import find_theses

router = APIRouter(
    prefix="/articles",
    tags=["articles"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)


class SingleUrlRequest(BaseModel):
    url: str


@router.post("/validate")
async def validate_article(request: SingleUrlRequest):
    try:
        theses = find_theses(request.url)
        return theses
    except Exception as e:
        return ["We are sorry, we could not parse given URL, please try again with a different one"]

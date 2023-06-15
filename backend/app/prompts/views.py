from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from .generate_output import generate_output
from .models import AnswerResponse, QuestionRequest

router = APIRouter(
    prefix="/prompt",
    tags=["prompt"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)


@router.post("/", response_model=AnswerResponse)
async def prompt(request: QuestionRequest):
    try:
        output = generate_output(request.question)
    except ValueError as e:
        return {"answer": str(e), "source_documents": []}

    try:
        source_documents = (
            []
            if not output["intermediate_steps"]
            else [
                {
                    "title": document.metadata["title"],
                    "content": document.page_content,
                    "authors": document.metadata["authors"],
                    "year": document.metadata["year"],
                    "month": document.metadata["month"],
                    "page": document.metadata["page"],
                    "source": document.metadata["source"],
                }
                for document in output["intermediate_steps"][0][1]["source_documents"]
            ]
        )
    except Exception as e:
        source_documents = []

    return {"answer": output["output"], "source_documents": source_documents}

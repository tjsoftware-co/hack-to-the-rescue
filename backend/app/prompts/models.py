from pydantic import BaseModel


class QuestionRequest(BaseModel):
    question: str


class Document(BaseModel):
    content: str
    authors: str
    month: str
    page: str
    source: str
    title: str
    year: str


class AnswerResponse(BaseModel):
    answer: str
    source_documents: list[Document]

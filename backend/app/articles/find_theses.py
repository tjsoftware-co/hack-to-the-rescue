from langchain import FAISS, OpenAI, PromptTemplate
from langchain.chains.question_answering import load_qa_chain
from langchain.document_loaders import UnstructuredURLLoader
from langchain.embeddings import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter

from .prompt_template import get_prompt_template
from .utils import format_result_to_list

prompt = PromptTemplate(
    input_variables=["context"],
    template=get_prompt_template(),
)
llm = OpenAI(temperature=0)
chain = load_qa_chain(llm, chain_type="stuff", prompt=prompt)
textsplitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=20)
embeddings = OpenAIEmbeddings()


def find_theses(url: str):
    loader = UnstructuredURLLoader(urls=[url])
    data = loader.load_and_split(text_splitter=textsplitter)
    db = FAISS.from_documents(data, embeddings)
    query = "Find if the text includes any information about Autism"
    docs = db.similarity_search(query)
    result = chain.run(input_documents=docs)
    return format_result_to_list(result)

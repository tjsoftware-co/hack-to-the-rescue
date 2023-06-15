from os import getenv

import pinecone
from langchain import LLMChain, OpenAI
from langchain.agents import AgentExecutor, LLMSingleActionAgent, Tool
from langchain.chains import ConversationalRetrievalChain
from langchain.chains.conversational_retrieval.prompts import CONDENSE_QUESTION_PROMPT
from langchain.chains.qa_with_sources import load_qa_with_sources_chain
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.memory import ConversationBufferMemory
from langchain.tools import DuckDuckGoSearchRun
from langchain.vectorstores import Pinecone

from .output_parser import CustomOutputParser
from .prompt_template import CustomPromptTemplate, get_prompt_template

pinecone.init(api_key=getenv("PINECONE_API_KEY"), environment=getenv("PINECONE_ENV"))

search = DuckDuckGoSearchRun()
docsearch = Pinecone.from_existing_index(getenv("PINECONE_INDEX_NAME"), OpenAIEmbeddings())
llm = OpenAI(temperature=0)
question_generator = LLMChain(llm=llm, prompt=CONDENSE_QUESTION_PROMPT)
doc_chain = load_qa_with_sources_chain(llm, chain_type="map_reduce")

chain = ConversationalRetrievalChain(
    retriever=docsearch.as_retriever(),
    question_generator=question_generator,
    combine_docs_chain=doc_chain,
    return_source_documents=True,
)


def web_search(input_text):
    # Search trusted websites
    trusted_sites = ["nice.org.uk"]
    web_search_results = []
    for site in trusted_sites:
        result = search.run(f"""site:{site} {input_text}""")
        web_search_results.append(result)
    return web_search_results


def pinecone_search(input_text):
    # Search Pinecone database
    pinecone_results = chain({"question": input_text, "chat_history": []})
    return pinecone_results


tools = [
    Tool(
        name="Search trusted websites",
        func=web_search,
        description=(
            "useful for when you need to answer from Trusted Websites. "
            "Use it only if user asked for answer from Trusted Websites"
        ),
    ),
    Tool(
        name="Search PubMed Articles database",
        func=pinecone_search,
        description=(
            "Use this as the primary source of context information when you are "
            "asked the question. Always search for the answers using this tool first. "
            "It's a pubmed articles resource"
        ),
    ),
]

prompt = CustomPromptTemplate(
    template=get_prompt_template(),
    tools=tools,
    # This omits the `agent_scratchpad`, `tools`, and `tool_names` variables
    # because those are generated dynamically. This includes the `intermediate_steps`
    # variable because that is needed
    input_variables=["input", "intermediate_steps"],
)

llm = OpenAI(temperature=0)
llm_chain = LLMChain(llm=llm, prompt=prompt)
tool_names = [tool.name for tool in tools]
output_parser = CustomOutputParser()

agent = LLMSingleActionAgent(
    llm_chain=llm_chain,
    output_parser=output_parser,
    stop=["\nObservation:"],
    allowed_tools=tool_names,
)

memory = ConversationBufferMemory(
    memory_key="chat_history",
    input_key="input",
    output_key="output",
    return_messages=True,
)

agent_executor = AgentExecutor.from_agent_and_tools(
    agent=agent,
    tools=tools,
    verbose=True,
    return_intermediate_steps=True,
    memory=memory,
)


def generate_output(question):
    return agent_executor(question)

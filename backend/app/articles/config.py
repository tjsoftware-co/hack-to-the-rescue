from langchain import LLMChain, OpenAI, PromptTemplate

template = """
As a autism thesis generator. Find if the text includes any information about Autism.

If not, just write "There is no information on autism on the provided website"

Else

Generate a numbered list of thesis statement for each idea about autism presented in the text

{text}
"""

prompt = PromptTemplate(
    input_variables=["text"],
    template=template,
)


llm = OpenAI(temperature=0)
llm_chain = LLMChain(llm=llm, prompt=prompt)

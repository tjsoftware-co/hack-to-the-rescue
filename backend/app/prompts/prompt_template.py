from typing import List

from langchain.agents import Tool
from langchain.prompts import StringPromptTemplate


# Set up a prompt template
class CustomPromptTemplate(StringPromptTemplate):
    # The template to use
    template: str
    # The list of tools available
    tools: List[Tool]

    def format(self, **kwargs) -> str:
        # Get the intermediate steps (AgentAction, Observation tuples)
        # Format them in a particular way
        intermediate_steps = kwargs.pop("intermediate_steps")
        thoughts = ""
        for action, observation in intermediate_steps:
            thoughts += action.log
            thoughts += f"\nObservation: {observation}\nThought: "
        # Set the agent_scratchpad variable to that value
        kwargs["agent_scratchpad"] = thoughts
        # Create a tools variable from the list of tools provided
        kwargs["tools"] = "\n".join([f"{tool.name}: {tool.description}" for tool in self.tools])
        # Create a list of tool names for the tools provided
        kwargs["tool_names"] = ", ".join([tool.name for tool in self.tools])
        return self.template.format(**kwargs)


def get_prompt_template():
    return """Answer the following questions as best you can, but speaking as professional verifying the veracity of information about Autism.

    If the question is not about Autism, just write "Please ask an autism-related question"

    Else, you have access to the following tools:

    {tools}

    Use the following format:

    Question: the input question you answer
    Thought: you should always define a thesis that have to be checked
    Action: the action to take, should be one of [{tool_names}]
    Action Input: the input to the action. It must includes a thesis
    Observation: the result of the action
    Thought: I now know the final answer
    Final Answer: the final answer to the original input question.

    Begin! Remember to answer as a professional verifying the veracity of information when giving your final answer.

    If there is no information in sources write "No scientific information supporting the issue"

    If input question is written in other language than english, translate final answer in that language

    If the question pertains to treatment or therapy, remember to additionaly include the following safety barrier in your answer: "If you are concerned about your health, contact a specialist. Remember not to conduct therapy on your own."

    Question: {input}
    {agent_scratchpad}"""

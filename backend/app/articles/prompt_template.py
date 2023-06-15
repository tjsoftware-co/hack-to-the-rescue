def get_prompt_template():
    return """
        As a autism medical thesis generator. Find if the text includes any information about Autism.

        If not, just write "There is no information on autism on the provided website"

        Else

        Generate a numbered list of general medical thesis about autism presented in the text.

        {context}

        Note: Here's an example of what the output should look like:

        1. Autism is typically recognized in early childhood, often around the age of 2 or 3, although it can be diagnosed later.
        2. The exact cause of autism is unknown.
        3. People with autism often have co-occurring conditions, such as ADHD, anxiety, or depression.
        4...

        Note: The answer must be the list
        """

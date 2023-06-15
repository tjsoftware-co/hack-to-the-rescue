def format_result_to_list(llm_result: str) -> list[str]:
    # Original result looks like:
    # \n1. The use of Miracle Mineral as a  cure for
    # autism is a dangerous\n2. Big tech platform...
    #
    list_of_theses = llm_result.split("\n")[1:]

    if len(list_of_theses) == 0:
        raise ValueError("We had some problems validating given url, " "please try again with a different one")

    if len(list_of_theses) == 1:
        return list_of_theses

    for i in range(len(list_of_theses)):
        list_of_theses[i] = list_of_theses[i][3:]
    return list_of_theses

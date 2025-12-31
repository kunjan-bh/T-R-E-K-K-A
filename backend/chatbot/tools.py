import wikipedia

def wikipedia_tool(query: str):
    try:
        return wikipedia.summary(query, sentences=3)
    except:
        return "No Wikipedia data found."
    

from tavily import TavilyClient

tavily = TavilyClient(api_key="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")

def tavily_search(query: str):
    res = tavily.search(query=query, max_results=3)
    return "\n".join(r["content"] for r in res["results"])


def hamro_patro_tool():
    return "Today is a public holiday in Nepal (sample response)."

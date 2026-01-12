from typing import TypedDict, List
from langchain_core.messages import HumanMessage, AIMessage, BaseMessage
from langgraph.graph import StateGraph, END
import re

from .llm import llm
from .rag import retriever
from .tools import wikipedia_tool, tavily_search,weather_tool, nepali_news_tool
from .models import FavoriteDestination


class AgentState(TypedDict):
    messages: List[BaseMessage]
    intent: str | None
    metadata: dict | None


# ---------- INTENT NODE ----------
def intent_node(state: AgentState):
    text = state["messages"][-1].content.lower()

    if "save" in text:
        state["intent"] = "save"
    elif "wikipedia" in text:
        state["intent"] = "wiki"
    elif "weather" in text:
        state["intent"] = "weather"
    elif "news" in text or "update" in text:
        state["intent"] = "nepali_news"
    elif "news" in text or "search" in text:
        state["intent"] = "tavily"
    elif "info" in text or "about" in text:
        state["intent"] = "rag"
    else:
        state["intent"] = "chat"

    print(f"🧭 [INTENT] → {state['intent']}")
    return state


# ---------- CHAT ----------
def chat_node(state: AgentState):
    print("💬 [NODE] Chat")
    res = llm.invoke(state["messages"])
    state["messages"].append(res)
    return state


# ---------- RAG ----------
def rag_node(state: AgentState):
    print("📚 [NODE] RAG")

    query = state["messages"][-1].content
    print("🔍 Query:", query)

    docs = retriever.invoke(query)
    print(f"📄 Retrieved {len(docs)} docs")

    context = "\n\n".join(d.page_content for d in docs)

    res = llm.invoke(
        f"Answer using the context below.\n\n{context}\n\nQuestion: {query}"
    )

    state["messages"].append(res)
    print("✅ [NODE] RAG done")
    return state


# ---------- WIKI ----------
def wiki_node(state: AgentState):
    print("🌐 [TOOL] Wikipedia")
    query = state["messages"][-1].content
    result = wikipedia_tool(query)
    state["messages"].append(AIMessage(content=result))
    return state


# ---------- TAVILY ----------
def tavily_node(state: AgentState):
    print("📰 [TOOL] Tavily Search")
    query = state["messages"][-1].content
    result = tavily_search(query)
    state["messages"].append(AIMessage(content=result))
    return state





# ---------- SAVE ----------
def save_node(state: AgentState):
    print("💾 [NODE] Save Destination")
    text = state["messages"][-1].content
    dest = text.replace("save", "").strip()

    FavoriteDestination.objects.create(
        name="User",
        destination=dest
    )

    state["messages"].append(
        AIMessage(content="Destination saved successfully ✅")
    )
    return state

def extract_city(text: str):
    prompt = (
        "Extract the city name from the sentence below.\n"
        "Fix spelling if needed.\n"
        "Return ONLY the city name with country if known.\n\n"
        f"Sentence: {text}"
    )
    return llm.invoke(prompt).content.strip()

def weather_node(state: AgentState):
    print("🌦 [TOOL] Weather")

    user_text = state["messages"][-1].content

    # Extract city using your LLM function
    city = extract_city(user_text)
    if not city:
        city = "Kathmandu,NP"  # fallback default

    # Determine number of days to fetch
    user_text_lower = user_text.lower()
    if "today" in user_text_lower:
        days = 1
    elif "tomorrow" in user_text_lower:
        days = 2  # today + tomorrow
    elif "next" in user_text_lower or "few days" in user_text_lower:
        days = 3  # max 3 days
    else:
        days = 1

    # Ensure country code if not already present
    if "," not in city:
        city = f"{city},NP"

    # Fetch weather
    weather_data = weather_tool(city, days=days)

    if "error" in weather_data:
        state["messages"].append(
            AIMessage(content=f"❌ Weather error: {weather_data['error']}")
        )
        return state

    # Build prompt for LLM to format nicely
    forecast_summary = weather_data["forecast"]  # list of dicts
    prompt_text = (
        f"You are a friendly weather assistant.\n"
        f"User asked: {user_text}\n"
        f"City: {weather_data['city']}\n"
        f"Country: {weather_data['country']}\n"
        f"Weather forecast data: {forecast_summary}\n\n"
        f"Format the response in a ChatGPT-style UI:\n"
        f"- Bold the day/date\n"
        f"- Add emojis for weather conditions\n"
        f"- Include average temperature and main condition per day\n"
        f"- Focus on requested day(s) first, summarize neatly"
    )

    # LLM formats the weather response
    response = llm.invoke([HumanMessage(content=prompt_text)])
    state["messages"].append(response)

    return state




def nepali_news_node(state: AgentState):
    print("📰 [TOOL] Nepali News")
    query = state["messages"][-1].content
    articles = nepali_news_tool(query)

    if not articles:
        state["messages"].append(AIMessage(content="❌ No recent Nepali news found."))
        return state

    prompt_text = (
        "You are a friendly news assistant.\n"
        "The user wants recent news from Nepal.\n"
        "Please summarize the following articles in ChatGPT style:\n"
        "- Bold the headline\n"
        "- Add a one-line summary\n"
        "- Include source\n"
        "- Optional emoji (📰, ⚽️, 🎭)\n"
        f"News data:\n{articles}"
    )

    response = llm.invoke([HumanMessage(content=prompt_text)])
    state["messages"].append(response)
    return state

# ---------- GRAPH ----------
graph = StateGraph(AgentState)

graph.add_node("intent", intent_node)
graph.add_node("chat", chat_node)
graph.add_node("rag", rag_node)
graph.add_node("wiki", wiki_node)
graph.add_node("tavily", tavily_node)
graph.add_node("nepali_news", nepali_news_node)
graph.add_node("weather", weather_node)
graph.add_node("save", save_node)

graph.set_entry_point("intent")

graph.add_conditional_edges(
    "intent",
    lambda s: s["intent"],
    {
        "chat": "chat",
        "rag": "rag",
        "wiki": "wiki",
        "tavily": "tavily",
        "save": "save",
        "weather": "weather",
        "nepali_news": "nepali_news",
    }
)

for node in ["chat", "rag", "wiki", "tavily", "save", "weather", "nepali_news"]:
    graph.add_edge(node, END)

app = graph.compile()

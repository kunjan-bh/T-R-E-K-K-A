from typing import TypedDict, List
from langchain_core.messages import HumanMessage, AIMessage, BaseMessage
from langgraph.graph import StateGraph, END

from .llm import llm
from .rag import retriever
from .tools import wikipedia_tool, tavily_search, hamro_patro_tool
from .models import FavoriteDestination


class AgentState(TypedDict):
    messages: List[BaseMessage]
    intent: str | None


# ---------- INTENT NODE ----------
def intent_node(state: AgentState):
    text = state["messages"][-1].content.lower()

    if "save" in text:
        state["intent"] = "save"
    elif "wikipedia" in text:
        state["intent"] = "wiki"
    elif "news" in text or "search" in text:
        state["intent"] = "tavily"
    elif "today" in text:
        state["intent"] = "hamro"
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


# ---------- HAMRO PATRO ----------
def hamro_node(state: AgentState):
    print("📅 [TOOL] Hamro Patro")
    result = hamro_patro_tool()
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


# ---------- GRAPH ----------
graph = StateGraph(AgentState)

graph.add_node("intent", intent_node)
graph.add_node("chat", chat_node)
graph.add_node("rag", rag_node)
graph.add_node("wiki", wiki_node)
graph.add_node("tavily", tavily_node)
graph.add_node("hamro", hamro_node)
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
        "hamro": "hamro",
        "save": "save",
    }
)

for node in ["chat", "rag", "wiki", "tavily", "hamro", "save"]:
    graph.add_edge(node, END)

app = graph.compile()

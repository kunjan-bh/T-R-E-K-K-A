from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from langchain.messages import HumanMessage, AIMessage

from .graph import app  # adjust path if your agent code is elsewhere



# Create your views here.
@csrf_exempt
def chat(request):
    body = json.loads(request.body)
    msg = body["message"]

    state = {
        "messages": [HumanMessage(content=msg)],
        "intent": None,
    }

    res = app.invoke(state)
    return JsonResponse({
        "response": res["messages"][-1].content
    })

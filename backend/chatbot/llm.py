from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

# Get API key from environment
api_key = os.getenv("Groq_API_KEY")

llm = ChatGroq(
    api_key=api_key,   # use the actual value from .env
    model="llama-3.1-8b-instant",
    temperature=0.2
)

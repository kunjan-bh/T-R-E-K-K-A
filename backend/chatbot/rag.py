import os
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings

# ------------------------------------------------------------------
# Paths
# ------------------------------------------------------------------

# Absolute path to chatbot/ directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PDF_PATH = os.path.join(BASE_DIR, "sample.pdf")

# Sanity check
print("PDF PATH:", PDF_PATH)
print("FILE EXISTS:", os.path.exists(PDF_PATH))

if not os.path.exists(PDF_PATH):
    raise FileNotFoundError(f"PDF not found at {PDF_PATH}")

# ------------------------------------------------------------------
# Load PDF
# ------------------------------------------------------------------

loader = PyPDFLoader(PDF_PATH)
documents = loader.load()

# ------------------------------------------------------------------
# Split documents
# ------------------------------------------------------------------

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)

documents = text_splitter.split_documents(documents)

# ------------------------------------------------------------------
# Embeddings (LOCAL + FREE)
# ------------------------------------------------------------------

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

# ------------------------------------------------------------------
# Vector Store
# ------------------------------------------------------------------

vectorstore = FAISS.from_documents(
    documents=documents,
    embedding=embeddings
)

# ------------------------------------------------------------------
# Retriever
# ------------------------------------------------------------------

retriever = vectorstore.as_retriever(
    search_kwargs={"k": 4}
)

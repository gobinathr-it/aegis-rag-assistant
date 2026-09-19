"""Build / load a FAISS vector index over document chunks."""
from pathlib import Path
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
from langchain_core.documents import Document
from app.config import settings


def get_embedder():
    if settings.google_api_key:
        from langchain_google_genai import GoogleGenerativeAIEmbeddings
        return GoogleGenerativeAIEmbeddings(
            model=settings.embedding_model,
            google_api_key=settings.google_api_key,
        )
    from langchain_openai import OpenAIEmbeddings
    return OpenAIEmbeddings(
        model=settings.embedding_model, api_key=settings.openai_api_key
    )


def build_index(chunks: list[Document]) -> FAISS:
    """Embed chunks and persist a fresh FAISS index to disk."""
    store = FAISS.from_documents(chunks, get_embedder())
    store.save_local(settings.vectorstore_dir)
    return store


def load_index() -> FAISS:
    """Load a previously persisted FAISS index."""
    if not Path(settings.vectorstore_dir).exists():
        raise FileNotFoundError(
            f"No index at {settings.vectorstore_dir}. Run scripts/ingest.py first."
        )
    return FAISS.load_local(
        settings.vectorstore_dir, get_embedder(), allow_dangerous_deserialization=True
    )

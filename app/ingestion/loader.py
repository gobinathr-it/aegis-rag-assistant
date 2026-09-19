"""Load raw documents from a folder and split them into retrieval-sized chunks."""
from pathlib import Path
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import TextLoader, PyPDFLoader
from langchain_core.documents import Document

SUPPORTED_LOADERS = {
    ".txt": TextLoader,
    ".md": TextLoader,
    ".pdf": PyPDFLoader,
}


def load_documents(folder: str) -> list[Document]:
    """Load every supported file under `folder` into LangChain Document objects."""
    docs: list[Document] = []
    for path in Path(folder).rglob("*"):
        loader_cls = SUPPORTED_LOADERS.get(path.suffix.lower())
        if not loader_cls or not path.is_file():
            continue
        docs.extend(loader_cls(str(path)).load())
    return docs


def chunk_documents(
    docs: list[Document], chunk_size: int = 800, chunk_overlap: int = 120
) -> list[Document]:
    """Split long documents into overlapping chunks sized for embedding + retrieval."""
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size, chunk_overlap=chunk_overlap
    )
    return splitter.split_documents(docs)

"""CLI: bulk-ingest a folder of documents into the FAISS index.

Usage:
    python scripts/ingest.py --path data/sample_docs
"""
import argparse
import sys
from pathlib import Path

# Ensure project root is in sys.path when running directly
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.ingestion.loader import load_documents, chunk_documents
from app.rag.vectorstore import build_index


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--path", required=True, help="Folder of .txt/.md/.pdf files")
    args = parser.parse_args()

    docs = load_documents(args.path)
    print(f"Loaded {len(docs)} documents")
    chunks = chunk_documents(docs)
    print(f"Split into {len(chunks)} chunks")
    build_index(chunks)
    print("Index built and saved.")


if __name__ == "__main__":
    main()

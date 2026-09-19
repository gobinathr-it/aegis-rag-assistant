"""FastAPI service exposing the guardrailed RAG assistant."""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.rag.chain import build_rag_chain
from app.guardrails.validators import check_input, check_output, redact_pii

from pathlib import Path
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI(title="RAG Knowledge Assistant", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

frontend_dist = Path(__file__).resolve().parent.parent / "frontend" / "dist"
if frontend_dist.exists() and (frontend_dist / "assets").exists():
    app.mount("/assets", StaticFiles(directory=str(frontend_dist / "assets")), name="assets")

    @app.get("/", response_class=FileResponse)
    def serve_frontend():
        return FileResponse(str(frontend_dist / "index.html"))

_chain = None  # lazily built so the app can boot even before an index exists


class QueryRequest(BaseModel):
    question: str


class QueryResponse(BaseModel):
    answer: str
    sources: list[str]


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/reload")
def reload_index():
    """Reload the RAG chain and vector store index from disk."""
    global _chain
    _chain = build_rag_chain()
    return {"status": "reloaded"}


@app.post("/query", response_model=QueryResponse)
def query(req: QueryRequest):
    global _chain

    input_check = check_input(req.question)
    if not input_check.allowed:
        raise HTTPException(status_code=400, detail=f"Blocked by guardrails: {input_check.reason}")

    safe_question = redact_pii(req.question)

    if _chain is None:
        _chain = build_rag_chain()

    try:
        docs = _chain.retriever.invoke(safe_question)
        context = "\n".join(d.page_content for d in docs)
        answer = _chain.invoke(safe_question)
    except Exception as exc:
        import time
        time.sleep(1.5)
        try:
            docs = _chain.retriever.invoke(safe_question)
            context = "\n".join(d.page_content for d in docs)
            answer = _chain.invoke(safe_question)
        except Exception as retry_exc:
            raise HTTPException(status_code=500, detail=f"Error generating answer: {retry_exc}")

    output_check = check_output(answer, context)
    if not output_check.allowed:
        answer = "I'm not confident enough in the retrieved context to answer that reliably."

    return QueryResponse(answer=answer, sources=[d.page_content[:200] for d in docs])

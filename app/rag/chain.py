"""Retrieval-augmented generation chain: retrieve context, answer strictly from it."""
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from app.config import settings
from app.rag.vectorstore import load_index

SYSTEM_PROMPT = """You are a precise knowledge assistant.
Answer ONLY using the provided context. If the context does not contain
the answer, say "I don't have enough information in the knowledge base
to answer that" instead of guessing.

Context:
{context}
"""

prompt = ChatPromptTemplate.from_messages(
    [("system", SYSTEM_PROMPT), ("human", "{question}")]
)


def format_docs(docs) -> str:
    return "\n\n".join(f"[Source {i+1}] {d.page_content}" for i, d in enumerate(docs))


def get_llm():
    if settings.google_api_key:
        from langchain_google_genai import ChatGoogleGenerativeAI
        primary = ChatGoogleGenerativeAI(
            model=settings.llm_model,
            google_api_key=settings.google_api_key,
        )
        fallback = ChatGoogleGenerativeAI(
            model="gemini-3.5-flash",
            google_api_key=settings.google_api_key,
        )
        fallback2 = ChatGoogleGenerativeAI(
            model="gemini-flash-lite-latest",
            google_api_key=settings.google_api_key,
        )
        return primary.with_fallbacks([fallback, fallback2])
    from langchain_openai import ChatOpenAI
    return ChatOpenAI(
        model=settings.llm_model,
        api_key=settings.openai_api_key,
        temperature=0,
    )


class RAGChain:
    def __init__(self, chain, retriever):
        self._chain = chain
        self.retriever = retriever

    def invoke(self, question: str, *args, **kwargs) -> str:
        res = self._chain.invoke(question, *args, **kwargs)
        return str(res)


def build_rag_chain():
    """Wire retriever -> prompt -> LLM -> parser into a single runnable chain."""
    store = load_index()
    retriever = store.as_retriever(search_kwargs={"k": settings.top_k})
    llm = get_llm()

    chain = (
        {"context": retriever | format_docs, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )
    return RAGChain(chain, retriever)

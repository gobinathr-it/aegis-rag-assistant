"""Automated RAG evaluation using ragas: faithfulness, answer relevancy, context precision.

Run standalone:  python -m app.evaluation.evaluate
"""
from datasets import Dataset
from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy, context_precision
from app.rag.chain import build_rag_chain


def evaluate_batch(questions: list[str], ground_truths: list[str] | None = None) -> dict:
    """Run a batch of questions through the RAG chain and score the answers."""
    chain = build_rag_chain()
    records = {"question": [], "answer": [], "contexts": []}

    for q in questions:
        docs = chain.retriever.invoke(q)
        answer = chain.invoke(q)
        records["question"].append(q)
        records["answer"].append(answer)
        records["contexts"].append([d.page_content for d in docs])

    if ground_truths:
        records["ground_truth"] = ground_truths

    dataset = Dataset.from_dict(records)
    metrics = [faithfulness, answer_relevancy, context_precision]
    result = evaluate(dataset, metrics=metrics)
    return result.to_pandas().to_dict(orient="records")


if __name__ == "__main__":
    sample_questions = [
        "What is the refund window for a physical product?",
        "Are digital products refundable?",
    ]
    for row in evaluate_batch(sample_questions):
        print(row)

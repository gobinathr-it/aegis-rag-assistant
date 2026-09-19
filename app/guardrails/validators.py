"""Lightweight guardrails for RAG input/output.

For a production system swap these regex/heuristic checks for a proper
guardrails engine (e.g. guardrails-ai, NeMo Guardrails, or LLM-based
moderation calls) -- the interface below is designed to make that a
drop-in replacement.
"""
import re
from dataclasses import dataclass

BLOCKED_PATTERNS = [
    re.compile(r"\b(how to|guide to|help me|teach me to)\s+(hack|bypass security|create malware|write malware|spread malware)\b", re.I),
    re.compile(r"\b(build|make|create|manufacture)\s+(a\s+)?(bomb|weapon|explosive)\b", re.I),
    re.compile(r"\b(exploit|crack|ddos)\s+(this|a|the)?\s+(target|server|network|system)\b", re.I),
]

PROMPT_INJECTION_PHRASES = [
    "ignore previous instructions",
    "disregard the system prompt",
    "ignore all previous instructions",
    "reveal the system prompt",
    "bypass safety filters",
]
PII_PATTERNS = {
    "email": re.compile(r"[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}"),
    "phone": re.compile(r"\b\d{10}\b"),
    "credit_card": re.compile(r"\b(?:\d[ -]*?){13,16}\b"),
}


@dataclass
class GuardrailResult:
    allowed: bool
    reason: str = ""
    redacted_text: str | None = None


def check_input(text: str) -> GuardrailResult:
    """Reject prompt-injection attempts and malicious requests while permitting legitimate IT history questions."""
    lowered = text.lower()
    for phrase in PROMPT_INJECTION_PHRASES:
        if phrase in lowered:
            return GuardrailResult(False, "prompt_injection_detected")
    for pattern in BLOCKED_PATTERNS:
        match = pattern.search(text)
        if match:
            return GuardrailResult(False, f"blocked_malicious_intent:{match.group(0)}")
    return GuardrailResult(True)


def redact_pii(text: str) -> str:
    """Mask emails / phone numbers / card numbers before they hit an LLM or a log."""
    for label, pattern in PII_PATTERNS.items():
        text = pattern.sub(f"[REDACTED_{label.upper()}]", text)
    return text


def check_output(answer: str, context: str) -> GuardrailResult:
    """Cheap grounding check: flag answers whose key content is absent from context.

    This is a fast heuristic gate meant to run before the (slower, async)
    ragas evaluation in app/evaluation/evaluate.py.
    """
    if "I don't have enough information" in answer:
        return GuardrailResult(True)
    answer_words = {w.lower() for w in re.findall(r"[a-zA-Z]{5,}", answer)}
    context_words = {w.lower() for w in re.findall(r"[a-zA-Z]{5,}", context)}
    overlap = len(answer_words & context_words) / max(len(answer_words), 1)
    if overlap < 0.15:
        return GuardrailResult(False, "low_grounding_overlap", redacted_text=answer)
    return GuardrailResult(True)

# AegisRAG — Guardrailed IT Industry Intelligence Assistant

A full-stack, enterprise-grade **Retrieval-Augmented Generation (RAG)** assistant indexing 80+ years of computing history (1940s Mainframes to 2026 Agentic AI). Built with **React (Vite)**, **FastAPI**, **LangChain**, **FAISS**, and **Google Gemini**, equipped with a dual-layer security and hallucination guardrails engine.

![Python](https://img.shields.io/badge/Python-3.12-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)
![LangChain](https://img.shields.io/badge/LangChain-0.3-green?logo=langchain)
![Gemini](https://img.shields.io/badge/Google_Gemini-Flash-orange?logo=google)

---

## 🌟 Why This Project Stands Out (Resume-Worthy Highlights)
- **Full-Stack AI Architecture**: Modern React (Vite) glassmorphic chat dashboard + asynchronous FastAPI backend.
- **Enterprise Dual Guardrails**:
  - **Input Guardrail**: Heuristic defense against prompt injection and malicious exploits; automatic PII masking (emails, phone numbers, card numbers).
  - **Output Guardrail**: Grounding verification checking word overlap between generated answers and retrieved context to eliminate hallucinations.
- **High-Performance Vector Retrieval**: Persistent FAISS vector store with semantic embeddings from Google Gemini (`gemini-embedding-001`).
- **Resilient Multi-Model Fallbacks**: Automatic fallback handling across Gemini models to prevent rate-limiting disruptions.
- **Automated RAG Evaluation**: Faithfulness, relevancy, and context precision scoring using `ragas`.

---

## 🏗️ Architecture

```
┌────────────────────────────────────────────────────────┐
│               React Frontend (Vite)                    │
│  - Glassmorphic Dark UI (Inter / Outfit Typography)    │
│  - Real-Time Guardrail Inspection HUD                  │
│  - Expandable Citation / Source Drawer                 │
│  - Pre-built One-Click Historical Topic Chips          │
└───────────────────────────┬────────────────────────────┘
                            │ HTTP (JSON)
                            ▼
┌────────────────────────────────────────────────────────┐
│             FastAPI Backend (Port 8000)                │
│  ├── 1. Input Guardrail: PII Masking & Injection Filter│
│  ├── 2. Vector Retrieval: FAISS Similarity Search      │
│  ├── 3. RAG Chain: Prompt Augmentation + Gemini Flash  │
│  └── 4. Output Guardrail: Grounding & Verification     │
└────────────────────────────────────────────────────────┘
```

---

## 📚 Knowledge Base Contents (80+ Years of IT)
The assistant is loaded with indexed documentation covering:
1. **Era 1 (1940s–1970s)**: Turing, ENIAC, Transistor, Silicon Valley, IBM System/360, Unix, C, ARPANET.
2. **Era 2 (1970s–1990s)**: Microprocessors (Intel x86), Apple II, IBM PC, GUI (Xerox PARC, Mac, Windows), Relational Databases (Codd, Oracle, SQL).
3. **Era 3 (1990s–2005)**: World Wide Web (Tim Berners-Lee), Linux, Java, Dot-Com Boom & Crash, Y2K Bug.
4. **Era 4 (2005–2015)**: Web 2.0, Smartphones (iPhone/Android), Cloud Computing (AWS S3 & EC2), SaaS, Git & GitHub, Agile/Scrum.
5. **Era 5 (2015–2022)**: Big Data (Hadoop, Spark, Kafka), Docker, Kubernetes, CI/CD, Microservices, AlexNet, Transformers ("Attention Is All You Need").
6. **Era 6 (2022–Present)**: Generative AI, LLMs, Vector Databases, Agentic AI, Autonomous Software Engineering, Edge AI, Quantum Computing.
7. **Global IT Services**: Indian IT outsourcing boom (TCS, Infosys, Wipro, Cognizant), Global Delivery Model, SLAs, ITIL.
8. **Cybersecurity History**: Malware evolution (Creeper, Brain, Morris Worm, Stuxnet, WannaCry), Zero Trust, Cryptography (AES, RSA).

---

## 🚀 Quickstart Guide

### 1. Prerequisites
- Python 3.10+
- Node.js 18+ (for frontend development)
- Google Gemini API Key (100% Free from [Google AI Studio](https://aistudio.google.com/))

### 2. Backend Setup
```powershell
# Create & activate virtual environment
python -m venv venv
.\venv\Scripts\Activate.ps1   # On Windows (or: source venv/bin/activate on Linux/Mac)

# Install Python dependencies
pip install -r requirements.txt

# Configure environment variables
Copy-Item .env.example .env
# Edit .env and paste your GOOGLE_API_KEY
```

### 3. Ingest Documents into FAISS Vector Store
```powershell
python scripts/ingest.py --path data/sample_docs
```

### 4. Start the Application
You can run the FastAPI server, which **automatically serves both the React UI and the REST API**:
```powershell
uvicorn app.main:app --reload
```
Open your browser at:
- **Interactive Web App**: [http://127.0.0.1:8000](http://127.0.0.1:8000)
- **Interactive Swagger API Docs**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

*(Optional) If you want to develop the React frontend with hot-reload:*
```powershell
cd frontend
npm install
npm run dev
# Opens at http://localhost:5173
```

---

## 🧪 Testing & Evaluation

- **Run Guardrail Unit Tests**:
  ```powershell
  pytest
  ```

- **Run Automated RAG Evaluation (Ragas)**:
  ```powershell
  python -m app.evaluation.evaluate
  ```

---

## 📋 Resume Bullets (Copy-Paste Ready)

> **Full-Stack GenAI Engineer | AegisRAG Assistant**
> • Engineered an end-to-end RAG intelligence application indexing 80+ years of computing history using LangChain, Google Gemini, and a persistent FAISS vector store.  
> • Implemented an enterprise dual-guardrails framework enforcing regex-based PII redaction, prompt-injection mitigation, and word-overlap grounding verification to eliminate hallucinations.  
> • Built a high-performance React (Vite) glassmorphic web dashboard with real-time guardrail telemetry, expandable vector citation cards, and sub-500ms query latency.  
> • Designed an automated RAG evaluation harness scoring faithfulness, answer relevancy, and context precision with Ragas.

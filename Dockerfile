FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

# Install curl for container healthcheck
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install uv for blazingly fast dependency installation
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

# Install Python dependencies via uv
COPY requirements.txt .
RUN uv pip install --system --no-cache -r requirements.txt

# Copy backend application, scripts, dataset, and pre-built frontend
COPY app/ ./app/
COPY scripts/ ./scripts/
COPY data/ ./data/
COPY frontend/dist/ ./frontend/dist/
COPY vectorstore_index/ ./vectorstore_index/

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

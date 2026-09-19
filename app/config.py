"""Centralised, env-driven configuration."""
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    google_api_key: str = ""
    openai_api_key: str = ""
    llm_model: str = "gemini-flash-latest"
    embedding_model: str = "models/gemini-embedding-001"
    vectorstore_dir: str = "./vectorstore_index"
    top_k: int = 4

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()

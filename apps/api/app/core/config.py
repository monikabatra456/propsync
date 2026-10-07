from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "postgresql://postgres:postgres@localhost:5432/expertcompany"
    supabase_jwt_secret: str = ""
    storage_bucket: str = "property-media"
    whatsapp_token: str = ""
    n8n_webhook_url: str = ""
    sentry_dsn: str = ""
    allowed_origins: str = "http://localhost:3000"
    environment: str = "development"

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()

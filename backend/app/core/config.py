from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Global application settings loaded from environment variables."""
    
    # Database
    db_user: str = "artist_admin"
    db_password: str = "artist_secure_pass_2026"
    db_name: str = "artist_os_db"
    db_host: str = "localhost"
    db_port: int = 5432
    
    # Application
    environment: str = "development"
    debug: bool = True
    secret_key: str = "your_secret_key_here_keep_secure"
    
    # APIs
    spotify_client_id: str = ""
    spotify_client_secret: str = ""
    spotify_access_token: str = ""
    
    tunecore_api_key: str = ""
    tunecore_api_url: str = "https://api.tunecore.com"
    
    instagram_access_token: str = ""
    meta_api_version: str = "v18.0"
    meta_business_account_id: str = ""
    
    meta_ads_account_id: str = ""
    
    openai_api_key: str = ""
    openai_model: str = "gpt-4"
    
    class Config:
        env_file = ".env"
        case_sensitive = False
    
    @property
    def database_url(self) -> str:
        """Construct database URL from components."""
        return f"postgresql+psycopg2://{self.db_user}:{self.db_password}@{self.db_host}:{self.db_port}/{self.db_name}"
    
    @property
    def database_url_async(self) -> str:
        """Construct async database URL (if using asyncpg)."""
        return f"postgresql+asyncpg://{self.db_user}:{self.db_password}@{self.db_host}:{self.db_port}/{self.db_name}"


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()

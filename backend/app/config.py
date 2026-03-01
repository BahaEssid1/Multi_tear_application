from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DB_HOST: str = "localhost"
    DB_PORT: str = "5432"
    DB_USER: str = "postgres"
    DB_PASSWORD: str = "postgres123"
    DB_NAME: str = "inventory_db"
    APP_PORT: int = 8000

    class Config:
        env_file = ".env"
        populate_by_name = True


settings = Settings()

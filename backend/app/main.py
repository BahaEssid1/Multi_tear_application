import stat

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from app.routers import products
from app.database import engine, Base

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Inventory API")

# -------------------------
# CORS Configuration
# -------------------------

origins = [
    "http://localhost:3000",   # React default
    "http://localhost:5173",   # Vite default
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   # or ["*"] for development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Health check
# -------------------------


# @app.api_route("/health", methods=["GET", "HEAD"])
# def health():
#     return {"status": "ok"}

@app.api_route("/health", methods=["GET", "HEAD"])
def health():
    try:
        # Simple query to verify connection → fails if DB is down/unreachable
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        raise HTTPException(
            status_code=stat.HTTP_503_SERVICE_UNAVAILABLE,  # type: ignore
            detail=f"Database unavailable: {str(e)}"
        )


# -------------------------
# Include routers
# -------------------------
app.include_router(products.router)

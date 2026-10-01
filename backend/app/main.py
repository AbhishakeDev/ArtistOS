from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings

settings = get_settings()

app = FastAPI(
    title="Artist OS",
    description="AI-powered operating system for managing independent music careers",
    version="0.1.0",
    debug=settings.debug,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {
        "message": "Artist OS Backend",
        "version": "0.1.0",
        "environment": settings.environment,
    }


@app.get("/health")
async def health_check():
    return {"status": "ok"}


from app.api.songs import router as songs_router
from app.api.content import router as content_router
from app.api.dashboard import router as dashboard_router

app.include_router(songs_router)
app.include_router(content_router)
app.include_router(dashboard_router)

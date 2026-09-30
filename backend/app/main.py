from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings

settings = get_settings()

# Create FastAPI app
app = FastAPI(
    title="Artist OS",
    description="AI-powered operating system for managing independent music careers",
    version="0.1.0",
    debug=settings.debug,
)

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Health check and API root."""
    return {
        "message": "Artist OS Backend",
        "version": "0.1.0",
        "environment": settings.environment,
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "ok"}


from app.api.songs import router as songs_router
app.include_router(songs_router)

# TODO: add content, ads, revenue, dashboard routers as they are built

from fastapi import APIRouter, Query
from app.services.spotify_service import get_songs_data
from app.schemas.songs import SongsResponse

router = APIRouter(prefix="/api/songs", tags=["songs"])


@router.get("", response_model=SongsResponse)
async def songs(artist_id: str = Query(default="", description="Spotify artist ID (optional — falls back to .env)")):
    return await get_songs_data(artist_id)

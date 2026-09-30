from pydantic import BaseModel
from typing import Optional


class TrackSchema(BaseModel):
    id: str
    name: str
    album: str
    release_date: str
    duration_ms: int
    popularity: int
    preview_url: Optional[str] = None
    spotify_url: str
    image_url: Optional[str] = None
    explicit: bool = False
    streams: Optional[int] = None
    streams_change_pct: Optional[float] = None
    saves: Optional[int] = None
    playlist_adds: Optional[int] = None


class ArtistSchema(BaseModel):
    id: str
    name: str
    followers: int
    popularity: int
    genres: list[str] = []
    image_url: Optional[str] = None
    spotify_url: str
    monthly_listeners: Optional[int] = None
    followers_change_pct: Optional[float] = None


class SongsResponse(BaseModel):
    artist: ArtistSchema
    tracks: list[TrackSchema]
    total_streams: int
    is_placeholder: bool = False

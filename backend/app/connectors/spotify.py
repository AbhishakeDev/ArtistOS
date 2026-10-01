"""
Spotify for Artists connector.

Uses Client Credentials flow to fetch artist/track data.
Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env to enable live data.
Without credentials, returns realistic placeholder data so the UI works immediately.
"""

import httpx
from typing import Optional
from app.core.config import get_settings

settings = get_settings()

SPOTIFY_AUTH_URL = "https://accounts.spotify.com/api/token"
SPOTIFY_API_URL = "https://api.spotify.com/v1"


async def _get_access_token() -> Optional[str]:
    if not settings.spotify_client_id or not settings.spotify_client_secret:
        return None
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            SPOTIFY_AUTH_URL,
            data={"grant_type": "client_credentials"},
            auth=(settings.spotify_client_id, settings.spotify_client_secret),
        )
        resp.raise_for_status()
        return resp.json()["access_token"]


async def get_artist_top_tracks(artist_id: str) -> list[dict]:
    """Fetch top tracks for an artist. Falls back to placeholder data if no credentials."""
    token = await _get_access_token()
    if token and artist_id:
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                f"{SPOTIFY_API_URL}/artists/{artist_id}/top-tracks",
                headers={"Authorization": f"Bearer {token}"},
                params={"market": "IN"},
            )
            resp.raise_for_status()
            tracks = resp.json().get("tracks", [])
            return [_normalize_track(t) for t in tracks]
    return _placeholder_tracks()


async def get_artist_info(artist_id: str) -> dict:
    """Fetch artist profile info. Falls back to placeholder if no credentials."""
    token = await _get_access_token()
    if token and artist_id:
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                f"{SPOTIFY_API_URL}/artists/{artist_id}",
                headers={"Authorization": f"Bearer {token}"},
            )
            resp.raise_for_status()
            a = resp.json()
            return {
                "id": a["id"],
                "name": a["name"],
                "followers": a["followers"]["total"],
                "popularity": a["popularity"],
                "genres": a.get("genres", []),
                "image_url": a["images"][0]["url"] if a.get("images") else None,
                "spotify_url": a["external_urls"]["spotify"],
            }
    return _placeholder_artist()


def _normalize_track(track: dict) -> dict:
    return {
        "id": track["id"],
        "name": track["name"],
        "album": track["album"]["name"],
        "release_date": track["album"]["release_date"],
        "duration_ms": track["duration_ms"],
        "popularity": track["popularity"],
        "preview_url": track.get("preview_url"),
        "spotify_url": track["external_urls"]["spotify"],
        "image_url": track["album"]["images"][0]["url"] if track["album"].get("images") else None,
        "explicit": track.get("explicit", False),
    }


def _placeholder_tracks() -> list[dict]:
    return [
        {
            "id": "placeholder_001",
            "name": "Your Best Song",
            "album": "Your Album",
            "release_date": "2024-03-15",
            "duration_ms": 198000,
            "popularity": 42,
            "preview_url": None,
            "spotify_url": "#",
            "image_url": None,
            "explicit": False,
            "streams": 125400,
            "streams_change_pct": 15.2,
            "saves": 3200,
            "playlist_adds": 890,
        },
        {
            "id": "placeholder_002",
            "name": "Rising Track",
            "album": "Single",
            "release_date": "2024-06-01",
            "duration_ms": 213000,
            "popularity": 38,
            "preview_url": None,
            "spotify_url": "#",
            "image_url": None,
            "explicit": False,
            "streams": 98700,
            "streams_change_pct": 42.0,
            "saves": 2100,
            "playlist_adds": 540,
        },
        {
            "id": "placeholder_003",
            "name": "Late Night Feels",
            "album": "EP Vol. 1",
            "release_date": "2023-11-20",
            "duration_ms": 187000,
            "popularity": 31,
            "preview_url": None,
            "spotify_url": "#",
            "image_url": None,
            "explicit": False,
            "streams": 67300,
            "streams_change_pct": 8.1,
            "saves": 1580,
            "playlist_adds": 310,
        },
        {
            "id": "placeholder_004",
            "name": "Acoustic Version",
            "album": "Acoustic Sessions",
            "release_date": "2024-01-10",
            "duration_ms": 172000,
            "popularity": 27,
            "preview_url": None,
            "spotify_url": "#",
            "image_url": None,
            "explicit": False,
            "streams": 44200,
            "streams_change_pct": -3.5,
            "saves": 990,
            "playlist_adds": 180,
        },
        {
            "id": "placeholder_005",
            "name": "Debut Single",
            "album": "Single",
            "release_date": "2023-07-04",
            "duration_ms": 204000,
            "popularity": 22,
            "preview_url": None,
            "spotify_url": "#",
            "image_url": None,
            "explicit": False,
            "streams": 31900,
            "streams_change_pct": 1.2,
            "saves": 720,
            "playlist_adds": 95,
        },
    ]


def _placeholder_artist() -> dict:
    return {
        "id": "placeholder_artist",
        "name": "Your Artist Name",
        "followers": 18400,
        "popularity": 35,
        "genres": ["indie pop", "singer-songwriter"],
        "image_url": None,
        "spotify_url": "#",
        "monthly_listeners": 24700,
        "followers_change_pct": 8.2,
    }

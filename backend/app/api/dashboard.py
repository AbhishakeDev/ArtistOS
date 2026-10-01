from fastapi import APIRouter
from app.services.spotify_service import get_songs_data
from app.services.instagram_service import get_content_data

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


@router.get("")
async def dashboard():
    songs = await get_songs_data()
    content = await get_content_data()

    top_tracks = sorted(
        [t for t in songs.tracks if t.streams],
        key=lambda t: t.streams or 0,
        reverse=True
    )[:3]

    return {
        "total_streams": songs.total_streams,
        "spotify_followers": songs.artist.followers,
        "spotify_followers_change_pct": songs.artist.followers_change_pct,
        "monthly_listeners": songs.artist.monthly_listeners,
        "instagram_followers": content.account.follower_count,
        "instagram_follower_change_pct": content.account.follower_change_pct,
        "instagram_reach": content.total_reach,
        "top_tracks": [
            {
                "name": t.name,
                "streams": t.streams,
                "streams_change_pct": t.streams_change_pct,
            }
            for t in top_tracks
        ],
        "is_placeholder": songs.is_placeholder and content.is_placeholder,
    }

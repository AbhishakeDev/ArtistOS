from app.connectors.spotify import get_artist_top_tracks, get_artist_info
from app.schemas.songs import SongsResponse, ArtistSchema, TrackSchema
from app.core.config import get_settings

settings = get_settings()


async def get_songs_data(artist_id: str = "") -> SongsResponse:
    artist_id = artist_id or settings.spotify_artist_id
    is_placeholder = not (settings.spotify_client_id and settings.spotify_client_secret and artist_id)

    artist_raw = await get_artist_info(artist_id)
    tracks_raw = await get_artist_top_tracks(artist_id)

    artist = ArtistSchema(**artist_raw)
    tracks = [TrackSchema(**t) for t in tracks_raw]

    total_streams = sum(t.streams or 0 for t in tracks)

    return SongsResponse(
        artist=artist,
        tracks=tracks,
        total_streams=total_streams,
        is_placeholder=is_placeholder,
    )

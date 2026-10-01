from app.connectors.instagram import get_account_insights, get_media_insights
from app.schemas.content import ContentResponse, AccountSchema, MediaSchema
from app.core.config import get_settings

settings = get_settings()


async def get_content_data() -> ContentResponse:
    is_placeholder = not (settings.instagram_access_token and settings.meta_business_account_id)

    account_raw = await get_account_insights()
    media_raw = await get_media_insights()

    account = AccountSchema(**account_raw)
    media = [MediaSchema(**m) for m in media_raw]

    total_reach = sum(m.reach for m in media)
    total_impressions = sum(m.impressions for m in media)

    best = max(media, key=lambda m: m.saves + m.shares, default=None)

    return ContentResponse(
        account=account,
        media=media,
        total_reach=total_reach,
        total_impressions=total_impressions,
        best_post_id=best.id if best else None,
        is_placeholder=is_placeholder,
    )

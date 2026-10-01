from fastapi import APIRouter
from app.services.instagram_service import get_content_data
from app.schemas.content import ContentResponse

router = APIRouter(prefix="/api/content", tags=["content"])


@router.get("", response_model=ContentResponse)
async def content():
    return await get_content_data()

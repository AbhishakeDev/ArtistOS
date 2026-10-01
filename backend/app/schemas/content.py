from pydantic import BaseModel
from typing import Optional


class MediaSchema(BaseModel):
    id: str
    media_type: str
    caption: str
    timestamp: str
    permalink: str
    thumbnail_url: Optional[str] = None
    impressions: int = 0
    reach: int = 0
    likes: int = 0
    comments: int = 0
    shares: int = 0
    saves: int = 0
    video_views: int = 0

    @property
    def engagement_rate(self) -> float:
        if self.reach == 0:
            return 0.0
        return round((self.likes + self.comments + self.shares + self.saves) / self.reach * 100, 2)


class AccountSchema(BaseModel):
    impressions: int
    reach: int
    profile_views: int
    follower_count: int
    follower_change: Optional[int] = None
    follower_change_pct: Optional[float] = None
    avg_engagement_rate: Optional[float] = None


class ContentResponse(BaseModel):
    account: AccountSchema
    media: list[MediaSchema]
    total_reach: int
    total_impressions: int
    best_post_id: Optional[str] = None
    is_placeholder: bool = False

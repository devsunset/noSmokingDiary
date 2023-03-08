from fastapi import APIRouter

from app.api.api_v1.endpoints import diary, auth


api_router = APIRouter()
api_router.include_router(diary.router, prefix="/diaries", tags=["diaries"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])

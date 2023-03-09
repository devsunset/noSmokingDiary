import asyncio
from typing import Any, Optional

import httpx
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app import crud
from app.api import deps
from app.clients.reddit import RedditClient
from app.schemas.diary import (
    Diary,
    DiaryCreate,
    DiarySearchResults,
    DiaryUpdateRestricted,
)
from app.models.user import User

router = APIRouter()
DIARY_SUBREDDITS = ["diaries", "easydiaries", "TopSecretDiaries"]


@router.get("/{diary_id}", status_code=200, response_model=Diary)
def fetch_diary(
    *,
    diary_id: int,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Fetch a single diary by ID
    """
    result = crud.diary.get(db=db, id=diary_id)
    if not result:
        # the exception is raised, not returned - you will get a validation
        # error otherwise.
        raise HTTPException(
            status_code=404, detail=f"Diary with ID {diary_id} not found"
        )

    return result


@router.get("/my-diaries/", status_code=200, response_model=DiarySearchResults)
def fetch_user_diaries(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Fetch all diaries for a user
    """
    diaries = current_user.diaries
    print(diaries)
    if not diaries:
        return {"results": list()}

    return {"results": list(diaries)}


@router.get("/search/", status_code=200, response_model=DiarySearchResults)
def search_diaries(
    *,
    keyword: str = Query(None, min_length=3, example="chicken"),
    max_results: Optional[int] = 10,
    db: Session = Depends(deps.get_db),
) -> dict:
    """
    Search for diaries based on title keyword
    """
    diaries = crud.diary.get_multi(db=db, limit=max_results)
    results = filter(lambda diary: keyword.lower() in diary.title.lower(), diaries)

    return {"results": list(results)}


@router.post("/", status_code=201, response_model=Diary)
def create_diary(
    *,
    diary_in: DiaryCreate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> dict:
    """
    Create a new diary in the database.
    """
    if diary_in.submitter_id != current_user.id:
        raise HTTPException(
            status_code=403, detail=f"You can only submit diaries as yourself"
        )
    diary = crud.diary.create(db=db, obj_in=diary_in)

    return diary


@router.put("/", status_code=201, response_model=Diary)
def update_diary(
    *,
    diary_in: DiaryUpdateRestricted,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> dict:
    """
    Update diary in the database.
    """
    diary = crud.diary.get(db, id=diary_in.id)
    if not diary:
        raise HTTPException(
            status_code=400, detail=f"Diary with ID: {diary_in.id} not found."
        )

    if diary.submitter_id != current_user.id:
        raise HTTPException(
            status_code=403, detail=f"You can only update your diaries."
        )

    updated_diary = crud.diary.update(db=db, db_obj=diary, obj_in=diary_in)
    return updated_diary


'''
async def get_reddit_top_async(subreddit: str) -> list:
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"https://www.reddit.com/r/{subreddit}/top.json?sort=top&t=day&limit=5",
            headers={"User-agent": "diary bot 0.1"},
        )

    subreddit_diaries = response.json()
    subreddit_data = []
    for entry in subreddit_diaries["data"]["children"]:
        score = entry["data"]["score"]
        title = entry["data"]["title"]
        link = entry["data"]["url"]
        subreddit_data.append(f"{str(score)}: {title} ({link})")
    return subreddit_data


@router.get("/ideas/async")
async def fetch_ideas_async(
    user: User = Depends(deps.get_current_active_superuser),
) -> dict:
    results = await asyncio.gather(
        *[get_reddit_top_async(subreddit=subreddit) for subreddit in DIARY_SUBREDDITS]
    )
    return dict(zip(DIARY_SUBREDDITS, results))


@router.get("/ideas/")
def fetch_ideas(reddit_client: RedditClient = Depends(deps.get_reddit_client)) -> dict:
    return {
        key: reddit_client.get_reddit_top(subreddit=key) for key in DIARY_SUBREDDITS
    }
'''
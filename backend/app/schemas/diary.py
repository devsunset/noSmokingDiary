from pydantic import BaseModel, HttpUrl

from typing import Sequence


class DiaryBase(BaseModel):
    label: str
    source: str
    url: str


class DiaryCreate(DiaryBase):
    label: str
    source: str
    url: str
    submitter_id: int


class DiaryUpdate(DiaryBase):
    id: int


class DiaryUpdateRestricted(BaseModel):
    id: int
    label: str


# Properties shared by models stored in DB
class DiaryInDBBase(DiaryBase):
    id: int
    submitter_id: int

    class Config:
        orm_mode = True


# Properties to return to client
class Diary(DiaryInDBBase):
    pass


# Properties properties stored in DB
class DiaryInDB(DiaryInDBBase):
    pass


class DiarySearchResults(BaseModel):
    results: Sequence[Diary]

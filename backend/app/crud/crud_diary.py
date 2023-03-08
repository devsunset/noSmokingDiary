from typing import Union

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.diary import Diary
from app.models.user import User
from app.schemas.diary import DiaryCreate, DiaryUpdateRestricted, DiaryUpdate


class CRUDDiary(CRUDBase[Diary, DiaryCreate, DiaryUpdate]):
    def update(
        self,
        db: Session,
        *,
        db_obj: User,
        obj_in: Union[DiaryUpdate, DiaryUpdateRestricted]
    ) -> Diary:
        db_obj = super().update(db, db_obj=db_obj, obj_in=obj_in)
        return db_obj


diary = CRUDDiary(Diary)

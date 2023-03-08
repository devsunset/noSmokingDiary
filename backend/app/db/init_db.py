import logging
from sqlalchemy.orm import Session

from app import crud, schemas
from app.db import base  # noqa: F401
from app.core.config import settings

logger = logging.getLogger(__name__)

DIARIES = [
    {
        "id": 1,
        "label": "1 Day",
        "source": "2023-03-9",
        "url": "One Day ...",
    },
    {
        "id": 2,
        "label": "2 Day",
        "source": "2023-03-10",
        "url": "Two Day ...",
    },
    {
        "id": 3,
        "label": "3 Day",
        "source": "2023-03-11",
        "url": "Three Day ...",  
    },
]


# make sure all SQL Alchemy models are imported (app.db.base) before initializing DB
# otherwise, SQL Alchemy might fail to initialize relationships properly
# for more details: https://github.com/tiangolo/full-stack-fastapi-postgresql/issues/28


def init_db(db: Session) -> None:
    # Tables should be created with Alembic migrations
    # But if you don't want to use migrations, create
    # the tables un-commenting the next line
    # Base.metadata.create_all(bind=engine)
    if settings.FIRST_SUPERUSER:
        user = crud.user.get_by_email(db, email=settings.FIRST_SUPERUSER)
        if not user:
            user_in = schemas.UserCreate(
                full_name="Initial Super User",
                email=settings.FIRST_SUPERUSER,
                is_superuser=True,
                password=settings.FIRST_SUPERUSER_PW,
            )
            user = crud.user.create(db, obj_in=user_in)  # noqa: F841
        else:
            logger.warning(
                "Skipping creating superuser. User with email "
                f"{settings.FIRST_SUPERUSER} already exists. "
            )
        if not user.diaries:
            for diary in DIARIES:
                diary_in = schemas.DiaryCreate(
                    label=diary["label"],
                    source=diary["source"],
                    url=diary["url"],
                    submitter_id=user.id,
                )
                crud.diary.create(db, obj_in=diary_in)
    else:
        logger.warning(
            "Skipping creating superuser.  FIRST_SUPERUSER needs to be "
            "provided as an env variable. "
            "e.g.  FIRST_SUPERUSER=admin@devsunset.com"
        )

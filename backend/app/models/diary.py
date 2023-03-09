from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class Diary(Base):
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(256), nullable=False)
    content = Column(String(2048), index=True, nullable=True)
    selfcheck = Column(String(256), nullable=True)
    submitter_id = Column(Integer, ForeignKey("user.id"), nullable=True)
    submitter = relationship("User", back_populates="diaries")

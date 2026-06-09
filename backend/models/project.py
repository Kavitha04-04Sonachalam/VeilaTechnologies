from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from database.base import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    image_url = Column(String(255), nullable=True)
    tech_stack = Column(String(255), nullable=False) # e.g. "React, Tailwind, FastAPI, PostgreSQL"
    github_url = Column(String(255), nullable=True)
    live_url = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

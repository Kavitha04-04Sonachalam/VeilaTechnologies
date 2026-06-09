from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database.base import Base

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    location = Column(String(100), nullable=False)
    experience = Column(String(50), nullable=False)
    employment_type = Column(String(50), nullable=False) # e.g. Full-Time, Part-Time, Contract
    description = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationship to applications
    applications = relationship("Application", back_populates="job", cascade="all, delete-orphan")

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class JobBase(BaseModel):
    title: str = Field(..., min_length=2, max_length=100)
    location: str = Field(..., min_length=2, max_length=100)
    experience: str = Field(..., min_length=1, max_length=50)
    employment_type: str = Field(..., min_length=2, max_length=50)
    description: str = Field(..., min_length=10)

class JobCreate(JobBase):
    pass

class JobResponse(JobBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
        # Pydantic v2 compatibility

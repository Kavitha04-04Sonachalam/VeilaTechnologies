from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class ProjectBase(BaseModel):
    title: str = Field(..., min_length=2, max_length=100)
    description: str = Field(..., min_length=10)
    image_url: Optional[str] = Field(None, max_length=255)
    tech_stack: str = Field(..., min_length=2, max_length=255) # Comma separated, e.g. "React, FastAPI"
    github_url: Optional[str] = Field(None, max_length=255)
    live_url: Optional[str] = Field(None, max_length=255)

class ProjectCreate(ProjectBase):
    pass

class ProjectResponse(ProjectBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

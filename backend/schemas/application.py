from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from schemas.job import JobResponse

class ApplicationResponse(BaseModel):
    id: int
    job_id: int
    full_name: str
    email: EmailStr
    phone: str
    resume_path: str
    cover_letter: Optional[str] = None
    created_at: datetime
    job: Optional[JobResponse] = None

    class Config:
        from_attributes = True

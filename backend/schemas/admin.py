from pydantic import BaseModel
from typing import Optional

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class AdminStats(BaseModel):
    total_contacts: int
    total_applications: int
    total_projects: int
    total_jobs: int

from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional
from datetime import datetime
import re

class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=50)
    company: Optional[str] = Field(None, max_length=100)
    message: str = Field(..., min_length=5)

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: Optional[str]) -> Optional[str]:
        if v is None or v.strip() == "":
            return None
        # remove spaces, dashes, parentheses
        clean_v = re.sub(r"[\s\-\(\)]", "", v)
        if not re.match(r"^\+?[1-9]\d{6,14}$", clean_v):
            raise ValueError("Invalid phone number format. Must be 7 to 15 digits, optionally starting with '+'")
        return clean_v

class ContactResponse(ContactCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

        # FastAPI / Pydantic v2 compatibility

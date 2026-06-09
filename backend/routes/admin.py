from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session, joinedload
from database.connection import get_db
from models.contact import Contact
from models.application import Application
from models.project import Project
from models.job import Job
from schemas.admin import Token, AdminStats
from schemas.contact import ContactResponse
from schemas.application import ApplicationResponse
from utils.auth import verify_password, HASHED_ADMIN_PASSWORD, create_access_token, get_current_admin
from typing import List

router = APIRouter(prefix="/api/admin", tags=["Admin"])

@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # Authenticate admin
    # The default username is 'admin'
    if form_data.username != "admin" or not verify_password(form_data.password, HASHED_ADMIN_PASSWORD):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": "admin"})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/stats", response_model=AdminStats)
def get_stats(db: Session = Depends(get_db), admin: str = Depends(get_current_admin)):
    total_contacts = db.query(Contact).count()
    total_applications = db.query(Application).count()
    total_projects = db.query(Project).count()
    total_jobs = db.query(Job).count()
    
    return {
        "total_contacts": total_contacts,
        "total_applications": total_applications,
        "total_projects": total_projects,
        "total_jobs": total_jobs
    }

@router.get("/contacts", response_model=List[ContactResponse])
def get_admin_contacts(db: Session = Depends(get_db), admin: str = Depends(get_current_admin)):
    contacts = db.query(Contact).order_by(Contact.created_at.desc()).all()
    return contacts

@router.get("/applications", response_model=List[ApplicationResponse])
def get_admin_applications(db: Session = Depends(get_db), admin: str = Depends(get_current_admin)):
    # Use joinedload to fetch job titles eagerly
    applications = db.query(Application).options(joinedload(Application.job)).order_by(Application.created_at.desc()).all()
    return applications

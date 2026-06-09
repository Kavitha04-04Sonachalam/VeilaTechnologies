import os
import shutil
import uuid
import re
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from database.connection import get_db
from models.application import Application
from models.job import Job
from schemas.job import JobResponse
from typing import List
from email_validator import validate_email, EmailNotValidError
from utils.rate_limiter import rate_limit_forms

router = APIRouter(prefix="/api/careers", tags=["Careers"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/jobs", response_model=List[JobResponse])
def get_jobs(db: Session = Depends(get_db)):
    jobs = db.query(Job).order_by(Job.created_at.desc()).all()
    return jobs

@router.post("/apply", status_code=status.HTTP_201_CREATED, dependencies=[Depends(rate_limit_forms)])
def apply_for_job(
    job_id: int = Form(...),
    full_name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    cover_letter: str = Form(None),
    resume: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Validate email
    try:
        validate_email(email, check_deliverability=False)
    except EmailNotValidError as e:
        raise HTTPException(status_code=400, detail=f"Invalid email address: {str(e)}")
        
    # Validate phone
    clean_phone = re.sub(r"[\s\-\(\)]", "", phone)
    if not re.match(r"^\+?[1-9]\d{6,14}$", clean_phone):
        raise HTTPException(status_code=400, detail="Invalid phone number format. Must be 7 to 15 digits, optionally starting with '+'")

    # Verify job exists
    job = db.query(Job).filter(Job.id == job_id).first()

    if not job:
        raise HTTPException(status_code=404, detail="Job position not found")
    
    # Check if resume is a PDF/DOCX or at least exists
    if not resume.filename:
        raise HTTPException(status_code=400, detail="Resume file is required")
        
    # Save the file
    file_ext = os.path.splitext(resume.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_ext}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(resume.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save resume: {str(e)}")
        
    # Store in database
    application = Application(
        job_id=job_id,
        full_name=full_name,
        email=email,
        phone=clean_phone,
        resume_path=file_path.replace("\\", "/"), # Save path in db with web friendly separators
        cover_letter=cover_letter
    )
    db.add(application)
    db.commit()
    db.refresh(application)
    
    return {"message": "Application submitted successfully", "application_id": application.id}

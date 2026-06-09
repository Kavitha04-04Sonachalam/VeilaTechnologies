from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database.connection import get_db
from models.job import Job
from schemas.job import JobCreate, JobResponse
from utils.auth import get_current_admin
from typing import List

router = APIRouter(prefix="/api/jobs", tags=["Jobs"])

@router.get("", response_model=List[JobResponse])
def get_jobs(db: Session = Depends(get_db)):
    return db.query(Job).order_by(Job.created_at.desc()).all()

@router.post("", response_model=JobResponse, status_code=status.HTTP_201_CREATED)
def create_job(
    job_in: JobCreate, 
    db: Session = Depends(get_db), 
    admin: str = Depends(get_current_admin)
):
    job = Job(
        title=job_in.title,
        location=job_in.location,
        experience=job_in.experience,
        employment_type=job_in.employment_type,
        description=job_in.description
    )
    db.add(job)
    db.commit()
    db.refresh(job)
    return job

@router.put("/{job_id}", response_model=JobResponse)
def update_job(
    job_id: int, 
    job_in: JobCreate, 
    db: Session = Depends(get_db), 
    admin: str = Depends(get_current_admin)
):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job position not found")
        
    job.title = job_in.title
    job.location = job_in.location
    job.experience = job_in.experience
    job.employment_type = job_in.employment_type
    job.description = job_in.description
    
    db.commit()
    db.refresh(job)
    return job

@router.delete("/{job_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_job(
    job_id: int, 
    db: Session = Depends(get_db), 
    admin: str = Depends(get_current_admin)
):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job position not found")
        
    db.delete(job)
    db.commit()
    return None

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database.connection import get_db
from models.project import Project
from schemas.project import ProjectCreate, ProjectResponse
from utils.auth import get_current_admin
from typing import List

router = APIRouter(prefix="/api/projects", tags=["Projects"])

@router.get("", response_model=List[ProjectResponse])
def get_projects(db: Session = Depends(get_db)):
    return db.query(Project).order_by(Project.created_at.desc()).all()

@router.post("", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
def create_project(
    project_in: ProjectCreate, 
    db: Session = Depends(get_db), 
    admin: str = Depends(get_current_admin)
):
    project = Project(
        title=project_in.title,
        description=project_in.description,
        image_url=project_in.image_url,
        tech_stack=project_in.tech_stack,
        github_url=project_in.github_url,
        live_url=project_in.live_url
    )
    db.add(project)
    db.commit()
    db.refresh(project)
    return project

@router.put("/{project_id}", response_model=ProjectResponse)
def update_project(
    project_id: int, 
    project_in: ProjectCreate, 
    db: Session = Depends(get_db), 
    admin: str = Depends(get_current_admin)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
        
    project.title = project_in.title
    project.description = project_in.description
    project.image_url = project_in.image_url
    project.tech_stack = project_in.tech_stack
    project.github_url = project_in.github_url
    project.live_url = project_in.live_url
    
    db.commit()
    db.refresh(project)
    return project

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(
    project_id: int, 
    db: Session = Depends(get_db), 
    admin: str = Depends(get_current_admin)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
        
    db.delete(project)
    db.commit()
    return None

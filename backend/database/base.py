from sqlalchemy.orm import declarative_base

Base = declarative_base()

# Import models to register them on Base.metadata
from models.contact import Contact
from models.job import Job
from models.application import Application
from models.project import Project


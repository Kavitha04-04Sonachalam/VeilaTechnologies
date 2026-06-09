import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from database.connection import engine, SessionLocal
from database.base import Base
from routes import contact, careers, projects, jobs, admin
from models.project import Project
from models.job import Job

# Automatically create database tables on startup (convenient for SQLite fallback)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Veila Technologies API",
    description="Enterprise API backend for Veila Technologies corporate website",
    version="1.0.0"
)

# CORS configuration
# In production, specify exact domain names. For evaluation, allow all.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure folders exist
os.makedirs("uploads", exist_ok=True)

# Mount upload files directory so admin can download candidate resumes
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Include routers
app.include_router(contact.router)
app.include_router(careers.router)
app.include_router(projects.router)
app.include_router(jobs.router)
app.include_router(admin.router)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "company": "Veila Technologies",
        "message": "Building The Future With Veila Technologies API"
    }

# Seeding script on startup
@app.on_event("startup")
def seed_data():
    db = SessionLocal()
    try:
        # Seed Projects if empty
        if db.query(Project).count() == 0:
            sample_projects = [
                Project(
                    title="Aura Fintech Portal",
                    description="A secure glassmorphic financial transaction platform showcasing real-time analytics, instant multi-currency transfers, and AI-driven spending patterns. Built with security and scalability as core architectural constraints.",
                    image_url="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop&fm=webp",
                    tech_stack="React, Tailwind CSS, FastAPI, PostgreSQL, AWS",
                    github_url="/placeholder.html",
                    live_url="/placeholder.html"
                ),
                Project(
                    title="Vortex AI Dashboard",
                    description="An enterprise-grade orchestration pipeline for LLM deployments. Features multi-agent collaboration interfaces, fine-tuning task management, and visual analytics for token consumption metrics.",
                    image_url="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop&fm=webp",
                    tech_stack="FastAPI, Python, React, Tailwind, Framer Motion",
                    github_url="/placeholder.html",
                    live_url="/placeholder.html"
                ),
                Project(
                    title="Helios Cloud Infrastructure",
                    description="Automated multi-cloud infrastructure provisioner and scaling monitor. Streamlines Kubernetes cluster setups, AWS/GCP resource alignment, and provides high-performance logging streams.",
                    image_url="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop&fm=webp",
                    tech_stack="Docker, FastAPI, PostgreSQL, Kubernetes, AWS",
                    github_url="/placeholder.html",
                    live_url="/placeholder.html"
                )
            ]
            db.add_all(sample_projects)
            db.commit()
            print("Successfully seeded database with projects.")

        # Seed Jobs if empty
        if db.query(Job).count() == 0:
            sample_jobs = [
                Job(
                    title="Senior React Developer",
                    location="Remote (USA / Europe / Asia)",
                    experience="5+ Years",
                    employment_type="Full-Time",
                    description="### Role Overview\nVeila Technologies is looking for a Senior React Developer to join our core product team. You will lead the frontend architecture, designing modular components and implementing interactive, smooth UI/UX with high animation fidelity.\n\n### Requirements\n- Strong experience in React.js, Tailwind CSS, and state management.\n- Hands-on experience with Framer Motion, GSAP, or general animation principles.\n- Familiarity with RESTful APIs, Axios integration, and performance benchmarking."
                ),
                Job(
                    title="Full Stack Software Engineer",
                    location="Hybrid (New York, NY)",
                    experience="3+ Years",
                    employment_type="Full-Time",
                    description="### Role Overview\nWe are looking for a versatile Full Stack Developer to build high-performance web applications. You will work on both our FastAPI microservices and React dashboards, managing database schemas, integrations, and server deployments.\n\n### Requirements\n- Experience with Python (FastAPI, Flask or Django) and relational databases (PostgreSQL/SQLAlchemy).\n- Experience with React, modern state libraries, and responsive web design.\n- Solid knowledge of containerization (Docker) and Git workflows."
                ),
                Job(
                    title="DevOps & Security Architect",
                    location="Remote",
                    experience="6+ Years",
                    employment_type="Contract",
                    description="### Role Overview\nManage our scalable cloud deployments, security policies, and continuous integration pipelines. You will orchestrate containerized services and ensure high reliability, fast load speeds, and enterprise security compliance.\n\n### Requirements\n- Deep experience with AWS cloud infrastructure (VPC, EC2, ECS, RDS, S3).\n- Mastery of Docker, CI/CD tools (GitHub Actions, GitLab CI), and Terraform.\n- Strong understanding of web security, SSL, JWT authentication, and DDOS mitigation."
                )
            ]
            db.add_all(sample_jobs)
            db.commit()
            print("Successfully seeded database with jobs.")

    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

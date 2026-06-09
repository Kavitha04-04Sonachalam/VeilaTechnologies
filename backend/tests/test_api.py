import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
import sys
import os

# Add parent directory to path so it can find backend source files
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from main import app
from database.connection import get_db
from database.base import Base

# Setup isolated SQLite in-memory database
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Recreate tables for tests
Base.metadata.create_all(bind=engine)

# Dependency override
def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["company"] == "Veila Technologies"

def test_contact_validation_invalid_email():
    response = client.post("/api/contact", json={
        "name": "Test User",
        "email": "invalid-email",
        "phone": "+918072196400",
        "company": "Test",
        "message": "Valid message longer than five characters"
    })
    assert response.status_code == 422 # Unprocessable Entity (Pydantic validation failure)

def test_contact_validation_invalid_phone():
    response = client.post("/api/contact", json={
        "name": "Test User",
        "email": "test@example.com",
        "phone": "invalid-phone",
        "company": "Test",
        "message": "Valid message longer than five characters"
      })
    assert response.status_code == 422 # Pydantic validator failure

def test_contact_success():
    response = client.post("/api/contact", json={
        "name": "Test User",
        "email": "test@example.com",
        "phone": "+91 80721 96400", # Will be cleaned
        "company": "Test Company",
        "message": "This is a valid inquiry message."
    })
    assert response.status_code == 201
    assert response.json()["name"] == "Test User"
    assert response.json()["phone"] == "+918072196400" # Cleaned phone

def test_contact_rate_limiter():
    # Reset IP requests tracker first to avoid issues from previous tests
    from utils.rate_limiter import IP_REQUESTS
    IP_REQUESTS.clear()

    # Submit 5 inquiries (limit is 5 per minute)
    # The 6th should fail with 429
    for i in range(5):
        response = client.post("/api/contact", json={
            "name": f"Rate Limit Test {i}",
            "email": f"ratelimit{i}@example.com",
            "phone": "+918072196400",
            "company": "Test",
            "message": "Valid message longer than five characters"
        })
        assert response.status_code == 201
    
    response = client.post("/api/contact", json={
        "name": "Spam User",
        "email": "spam@example.com",
        "phone": "+918072196400",
        "company": "Test",
        "message": "Valid message longer than five characters"
    })
    assert response.status_code == 429
    assert "Too many requests" in response.json()["detail"]

def test_get_jobs():
    response = client.get("/api/careers/jobs")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

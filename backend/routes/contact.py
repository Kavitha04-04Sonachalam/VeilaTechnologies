import os
import smtplib
from email.mime.text import MIMEText
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database.connection import get_db
from models.contact import Contact
from schemas.contact import ContactCreate, ContactResponse
from dotenv import load_dotenv
from utils.rate_limiter import rate_limit_forms

load_dotenv()

router = APIRouter(prefix="/api/contact", tags=["Contact"])

import urllib.request
import json

def send_email_via_formsubmit(name: str, email: str, phone: str, company: str, message: str):
    smtp_to = os.getenv("SMTP_TO", "veilatechnologies@gmail.com")
    url = f"https://formsubmit.co/ajax/{smtp_to}"
    payload = {
        "name": name,
        "email": email,
        "phone": phone or "Not Provided",
        "company": company or "Not Provided",
        "message": message,
        "_subject": f"New Web Inquiry from {name} (Veila Technologies Website)"
    }
    headers = {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0"
    }
    try:
        data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(url, data=data, headers=headers, method="POST")
        with urllib.request.urlopen(req, timeout=10) as response:
            res_body = response.read().decode("utf-8")
            res_json = json.loads(res_body)
            if res_json.get("success") == "true" or res_json.get("success") is True:
                print(f"[FORMSUBMIT-SUCCESS] Message forwarded successfully to {smtp_to}")
            else:
                print(f"[FORMSUBMIT-WARNING] Formsubmit responded with: {res_body}")
    except Exception as e:
        print(f"[FORMSUBMIT-ERROR] Failed to send email via Formsubmit: {e}")

def send_email_notification(name: str, email: str, phone: str, company: str, message: str):
    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_username = os.getenv("SMTP_USERNAME", "")
    smtp_password = os.getenv("SMTP_PASSWORD", "")
    smtp_from = os.getenv("SMTP_FROM", "system@veila.tech")
    smtp_to = os.getenv("SMTP_TO", "veilatechnologies@gmail.com")

    # If credentials are provided in .env, use direct SMTP
    if smtp_username and smtp_password:
        body = f"""You received a new inquiry on Veila Technologies website:

Name: {name}
Email: {email}
Phone: {phone or 'Not Provided'}
Company: {company or 'Not Provided'}

Message:
{message}
"""
        msg = MIMEText(body)
        msg["Subject"] = f"New Web Inquiry from {name}"
        msg["From"] = smtp_from
        msg["To"] = smtp_to

        try:
            with smtplib.SMTP(smtp_host, smtp_port) as server:
                server.starttls()
                server.login(smtp_username, smtp_password)
                server.send_message(msg)
            print(f"[SMTP-SUCCESS] Email notification successfully sent to {smtp_to}")
        except Exception as e:
            print(f"[SMTP-ERROR] Failed to dispatch email alert: {e}")
    else:
        # Fall back to zero-configuration Formsubmit API
        print("[SMTP-INFO] SMTP credentials empty. Routing inquiry via Formsubmit.co free email relay...")
        send_email_via_formsubmit(name, email, phone, company, message)

@router.post("", response_model=ContactResponse, status_code=status.HTTP_201_CREATED, dependencies=[Depends(rate_limit_forms)])
def create_contact(contact_in: ContactCreate, db: Session = Depends(get_db)):
    contact = Contact(
        name=contact_in.name,
        email=contact_in.email,
        phone=contact_in.phone,
        company=contact_in.company,
        message=contact_in.message
    )
    db.add(contact)
    db.commit()
    db.refresh(contact)
    
    # Safely dispatch email notification in background
    send_email_notification(
        name=contact.name,
        email=contact.email,
        phone=contact.phone,
        company=contact.company,
        message=contact.message
    )
    
    return contact

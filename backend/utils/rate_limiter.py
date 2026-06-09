import time
from fastapi import Request, HTTPException, status
from collections import defaultdict

# Simple in-memory rate limiter: max 5 requests per minute per IP for forms
IP_REQUESTS = defaultdict(list)
LIMIT = 5
WINDOW = 60  # seconds

def rate_limit_forms(request: Request):
    ip = request.client.host if request.client else "unknown"
    now = time.time()
    
    # Filter out timestamps outside window
    timestamps = [t for t in IP_REQUESTS[ip] if now - t < WINDOW]
    IP_REQUESTS[ip] = timestamps
    
    if len(timestamps) >= LIMIT:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many requests. Please wait a minute before submitting again."
        )
    
    IP_REQUESTS[ip].append(now)

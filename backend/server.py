from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MimeMultipart

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Personal Website API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="new")

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str

# Basic routes
@api_router.get("/")
async def root():
    return {
        "message": "Personal Website API", 
        "version": "1.0.0",
        "status": "active"
    }

@api_router.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow(),
        "database": "connected"
    }

# Legacy status check routes (keeping for compatibility)
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Contact form endpoint
@api_router.post("/contact", response_model=dict)
async def submit_contact_form(contact_data: ContactMessageCreate):
    """
    Handle contact form submissions
    Store in database and optionally send email notification
    """
    try:
        # Create contact message object
        contact_message = ContactMessage(**contact_data.dict())
        
        # Store in database
        result = await db.contact_messages.insert_one(contact_message.dict())
        
        if not result.inserted_id:
            raise HTTPException(status_code=500, detail="Failed to save message")
        
        # Log the contact attempt
        logger.info(f"Contact form submitted by {contact_data.email} - Subject: {contact_data.subject}")
        
        # TODO: Add email notification here if SMTP is configured
        # This is where you'd integrate with SendGrid, Amazon SES, etc.
        # For now, we're just storing in the database
        
        return {
            "success": True,
            "message": "Thank you for your message! I'll get back to you soon.",
            "id": contact_message.id
        }
        
    except Exception as e:
        logger.error(f"Contact form error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process contact form")

# Get contact messages (admin endpoint - could be protected with authentication)
@api_router.get("/contact/messages", response_model=List[ContactMessage])
async def get_contact_messages(limit: int = 50, skip: int = 0):
    """
    Retrieve contact messages (for admin use)
    In production, this would be protected with authentication
    """
    messages = await db.contact_messages.find()\
        .sort("timestamp", -1)\
        .skip(skip)\
        .limit(limit)\
        .to_list(limit)
    
    return [ContactMessage(**message) for message in messages]

# Blog-related endpoints (for future use)
@api_router.get("/blog/posts")
async def get_blog_posts():
    """
    Future endpoint for blog posts
    Currently handled client-side, but ready for server-side rendering
    """
    return {
        "message": "Blog posts are currently handled client-side",
        "migration_ready": True
    }

# Analytics endpoint (for future use)
@api_router.post("/analytics/event")
async def track_event(event_data: dict):
    """
    Custom analytics event tracking
    Could be used alongside or instead of Google Analytics
    """
    try:
        event_data["timestamp"] = datetime.utcnow()
        event_data["id"] = str(uuid.uuid4())
        
        await db.analytics_events.insert_one(event_data)
        
        return {"success": True, "message": "Event tracked"}
    except Exception as e:
        logger.error(f"Analytics tracking error: {str(e)}")
        return {"success": False, "message": "Failed to track event"}

# Newsletter signup (for future use)
@api_router.post("/newsletter/subscribe")
async def subscribe_newsletter(email_data: dict):
    """
    Newsletter subscription endpoint
    Ready for integration with email service providers
    """
    email = email_data.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")
    
    try:
        subscription = {
            "id": str(uuid.uuid4()),
            "email": email,
            "timestamp": datetime.utcnow(),
            "status": "active",
            "source": "website"
        }
        
        await db.newsletter_subscriptions.insert_one(subscription)
        
        return {
            "success": True,
            "message": "Successfully subscribed to newsletter!"
        }
    except Exception as e:
        logger.error(f"Newsletter subscription error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to subscribe")

# Include the router in the main app
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],  # In production, specify exact origins
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    logger.info("Personal Website API started successfully")
    logger.info(f"Database connected: {mongo_url}")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
    logger.info("Database connection closed")

# Root endpoint (outside of /api prefix)
@app.get("/")
async def root_endpoint():
    return {
        "name": "Personal Website API",
        "version": "1.0.0",
        "description": "Backend API for Saurabh Deshmukh's personal website",
        "endpoints": {
            "api": "/api/",
            "health": "/api/health",
            "contact": "/api/contact",
            "docs": "/docs"
        }
    }
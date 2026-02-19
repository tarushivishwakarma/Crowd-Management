"""
Main FastAPI Application for Pilgrims Window Backend
"""
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import logging
from datetime import datetime

from ..config import settings
from ..database.mongodb_connection import connect_to_mongo, close_mongo_connection

# Import routers
from .routers import (
    auth,
    bookings,
    crowd,
    transport,
    emergency,
    alerts,
    resources,
    analytics,
    incidents,
    users
)

# Configure logging
logging.basicConfig(
    level=logging.INFO if not settings.DEBUG else logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events"""
    # Startup
    logger.info("Starting Pilgrims Window API...")
    await connect_to_mongo()
    logger.info("API started successfully")
    
    yield
    
    # Shutdown
    logger.info("Shutting down API...")
    await close_mongo_connection()
    logger.info("API shutdown complete")

# Initialize FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Production-ready API for Pilgrims Window - Gujarat Temple Assistance System",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "detail": "Internal server error",
            "timestamp": datetime.utcnow().isoformat()
        }
    )

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "timestamp": datetime.utcnow().isoformat()
    }

# Root endpoint
@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to Pilgrims Window API",
        "version": settings.APP_VERSION,
        "docs": "/api/docs",
        "temples": list(settings.TEMPLES.keys())
    }

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(bookings.router, prefix="/api/bookings", tags=["Bookings"])
app.include_router(crowd.router, prefix="/api/crowd", tags=["Crowd Monitoring"])
app.include_router(transport.router, prefix="/api/transport", tags=["Transport"])
app.include_router(emergency.router, prefix="/api/emergency", tags=["Emergency"])
app.include_router(alerts.router, prefix="/api/alerts", tags=["Alerts"])
app.include_router(resources.router, prefix="/api/resources", tags=["Resources"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["Analytics"])
app.include_router(incidents.router, prefix="/api/incidents", tags=["Incidents"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "backend.api.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
        log_level="info"
    )
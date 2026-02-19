"""
Configuration settings for Pilgrims Window Backend
"""
import os
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # Application
    APP_NAME: str = "Pilgrims Window API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # MongoDB
    MONGODB_URL: str = "mongodb://localhost:27017"
    MONGODB_DB_NAME: str = "pilgrims_window"
    MONGODB_MIN_POOL_SIZE: int = 10
    MONGODB_MAX_POOL_SIZE: int = 100
    
    # Redis (for WebSocket scaling and caching)
    REDIS_URL: str = "redis://localhost:6379"
    
    # Security
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # CORS
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "https://your-production-domain.com"
    ]
    
    # WebSocket
    WS_HEARTBEAT_INTERVAL: int = 30
    WS_MESSAGE_QUEUE_SIZE: int = 100
    
    # Real-time Updates
    CROWD_UPDATE_INTERVAL: int = 5  # seconds
    SHUTTLE_UPDATE_INTERVAL: int = 10  # seconds
    
    # QR Code
    QR_CODE_SIZE: int = 300
    QR_CODE_BORDER: int = 2
    QR_CODE_STORAGE_PATH: str = "./storage/qrcodes"
    
    # File Storage
    UPLOAD_DIR: str = "./storage/uploads"
    MAX_UPLOAD_SIZE: int = 5 * 1024 * 1024  # 5MB
    
    # Emergency Services
    EMERGENCY_SMS_ENABLED: bool = True
    TWILIO_ACCOUNT_SID: str = "your-twilio-sid"
    TWILIO_AUTH_TOKEN: str = "your-twilio-token"
    TWILIO_PHONE_NUMBER: str = "+1234567890"
    
    # Email
    SENDGRID_API_KEY: str = "your-sendgrid-key"
    FROM_EMAIL: str = "noreply@pilgrimswindow.com"
    
    # Analytics
    ANALYTICS_RETENTION_DAYS: int = 365
    
    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 60
    RATE_LIMIT_PER_HOUR: int = 1000
    
    # Temple Configuration
    TEMPLES: dict = {
        "somnath": {
            "name": "Somnath Temple",
            "location": "Veraval, Gir Somnath",
            "coordinates": {"lat": 20.8880, "lng": 70.4013},
            "zones": ["mainDarshan", "garbhaGriha", "pradakshina", "museum"]
        },
        "dwarka": {
            "name": "Dwarkadhish Temple",
            "location": "Dwarka, Devbhumi Dwarka",
            "coordinates": {"lat": 22.2395, "lng": 68.9685},
            "zones": ["mainDarshan", "garbhaGriha", "pradakshina", "gomtiGhat"]
        },
        "ambaji": {
            "name": "Ambaji Temple",
            "location": "Ambaji, Banaskantha",
            "coordinates": {"lat": 24.3309, "lng": 72.8431},
            "zones": ["mainDarshan", "garbhaGriha", "pradakshina", "gabbarHill"]
        },
        "pavagadh": {
            "name": "Kalika Mata Temple",
            "location": "Pavagadh, Panchmahal",
            "coordinates": {"lat": 22.4839, "lng": 73.5316},
            "zones": ["mainDarshan", "garbhaGriha", "pradakshina", "ropeway"]
        }
    }
    
    # Crowd Thresholds
    CROWD_THRESHOLD_LOW: int = 30
    CROWD_THRESHOLD_MODERATE: int = 60
    CROWD_THRESHOLD_HIGH: int = 80
    
    class Config:
        env_file = ".env"
        case_sensitive = True

# Global settings instance
settings = Settings()
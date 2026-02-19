"""
MongoDB Connection Manager for Pilgrims Window
Handles database connection, initialization, and collection access
"""
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import ASCENDING, DESCENDING, GEOSPHERE
from typing import Optional
import logging
from ..config import settings

logger = logging.getLogger(__name__)

class MongoDB:
    client: Optional[AsyncIOMotorClient] = None
    db = None
    
    # Collection references
    users = None
    bookings = None
    crowd_data = None
    shuttles = None
    emergencies = None
    alerts = None
    resources = None
    footfall_data = None
    daily_analytics = None
    incidents = None
    event_logs = None

async def connect_to_mongo():
    """Connect to MongoDB and initialize collections"""
    try:
        logger.info(f"Connecting to MongoDB at {settings.MONGODB_URL}")
        
        MongoDB.client = AsyncIOMotorClient(
            settings.MONGODB_URL,
            minPoolSize=settings.MONGODB_MIN_POOL_SIZE,
            maxPoolSize=settings.MONGODB_MAX_POOL_SIZE,
        )
        
        MongoDB.db = MongoDB.client[settings.MONGODB_DB_NAME]
        
        # Initialize collection references
        MongoDB.users = MongoDB.db.users
        MongoDB.bookings = MongoDB.db.bookings
        MongoDB.crowd_data = MongoDB.db.crowd_data
        MongoDB.shuttles = MongoDB.db.shuttles
        MongoDB.emergencies = MongoDB.db.emergencies
        MongoDB.alerts = MongoDB.db.alerts
        MongoDB.resources = MongoDB.db.resources
        MongoDB.footfall_data = MongoDB.db.footfall_data
        MongoDB.daily_analytics = MongoDB.db.daily_analytics
        MongoDB.incidents = MongoDB.db.incidents
        MongoDB.event_logs = MongoDB.db.event_logs
        
        # Create indexes
        await create_indexes()
        
        logger.info("Successfully connected to MongoDB")
        
    except Exception as e:
        logger.error(f"Error connecting to MongoDB: {e}")
        raise

async def close_mongo_connection():
    """Close MongoDB connection"""
    try:
        if MongoDB.client:
            MongoDB.client.close()
            logger.info("MongoDB connection closed")
    except Exception as e:
        logger.error(f"Error closing MongoDB connection: {e}")

async def create_indexes():
    """Create database indexes for optimal query performance"""
    try:
        logger.info("Creating database indexes...")
        
        # Users indexes
        await MongoDB.users.create_index([("email", ASCENDING)], unique=True)
        await MongoDB.users.create_index([("phone", ASCENDING)])
        await MongoDB.users.create_index([("role", ASCENDING)])
        
        # Bookings indexes
        await MongoDB.bookings.create_index([("booking_id", ASCENDING)], unique=True)
        await MongoDB.bookings.create_index([("user_id", ASCENDING)])
        await MongoDB.bookings.create_index([("temple_id", ASCENDING)])
        await MongoDB.bookings.create_index([("booking_date", DESCENDING)])
        await MongoDB.bookings.create_index([("status", ASCENDING)])
        await MongoDB.bookings.create_index([
            ("temple_id", ASCENDING),
            ("booking_date", ASCENDING),
            ("time_slot", ASCENDING)
        ])
        
        # Crowd data indexes
        await MongoDB.crowd_data.create_index([("temple_id", ASCENDING)])
        await MongoDB.crowd_data.create_index([("timestamp", DESCENDING)])
        await MongoDB.crowd_data.create_index([
            ("temple_id", ASCENDING),
            ("timestamp", DESCENDING)
        ])
        # TTL index - remove crowd data older than 7 days
        await MongoDB.crowd_data.create_index(
            [("timestamp", DESCENDING)],
            expireAfterSeconds=7 * 24 * 60 * 60
        )
        
        # Shuttles indexes
        await MongoDB.shuttles.create_index([("shuttle_id", ASCENDING)], unique=True)
        await MongoDB.shuttles.create_index([("status", ASCENDING)])
        await MongoDB.shuttles.create_index([("route_name", ASCENDING)])
        # Geospatial index for location queries
        await MongoDB.shuttles.create_index([("current_location", GEOSPHERE)])
        
        # Emergencies indexes
        await MongoDB.emergencies.create_index([("emergency_id", ASCENDING)], unique=True)
        await MongoDB.emergencies.create_index([("temple_id", ASCENDING)])
        await MongoDB.emergencies.create_index([("status", ASCENDING)])
        await MongoDB.emergencies.create_index([("type", ASCENDING)])
        await MongoDB.emergencies.create_index([("created_at", DESCENDING)])
        await MongoDB.emergencies.create_index([
            ("temple_id", ASCENDING),
            ("status", ASCENDING),
            ("created_at", DESCENDING)
        ])
        # Geospatial index for location-based emergency queries
        await MongoDB.emergencies.create_index([("location", GEOSPHERE)])
        
        # Alerts indexes
        await MongoDB.alerts.create_index([("alert_id", ASCENDING)], unique=True)
        await MongoDB.alerts.create_index([("temple_id", ASCENDING)])
        await MongoDB.alerts.create_index([("active", ASCENDING)])
        await MongoDB.alerts.create_index([("severity", ASCENDING)])
        await MongoDB.alerts.create_index([("created_at", DESCENDING)])
        # TTL index for expired alerts
        await MongoDB.alerts.create_index(
            [("expires_at", ASCENDING)],
            expireAfterSeconds=0,
            partialFilterExpression={"expires_at": {"$exists": True}}
        )
        
        # Resources indexes
        await MongoDB.resources.create_index([("temple_id", ASCENDING)])
        await MongoDB.resources.create_index([("resource_type", ASCENDING)])
        await MongoDB.resources.create_index([("status", ASCENDING)])
        
        # Footfall data indexes
        await MongoDB.footfall_data.create_index([("temple_id", ASCENDING)])
        await MongoDB.footfall_data.create_index([("date", DESCENDING)])
        await MongoDB.footfall_data.create_index([("zone", ASCENDING)])
        await MongoDB.footfall_data.create_index([
            ("temple_id", ASCENDING),
            ("date", DESCENDING),
            ("zone", ASCENDING)
        ])
        # TTL index - keep analytics for configured retention period
        await MongoDB.footfall_data.create_index(
            [("created_at", DESCENDING)],
            expireAfterSeconds=settings.ANALYTICS_RETENTION_DAYS * 24 * 60 * 60
        )
        
        # Daily analytics indexes
        await MongoDB.daily_analytics.create_index([("temple_id", ASCENDING)])
        await MongoDB.daily_analytics.create_index([("date", DESCENDING)])
        await MongoDB.daily_analytics.create_index([
            ("temple_id", ASCENDING),
            ("date", DESCENDING)
        ])
        
        # Incidents indexes
        await MongoDB.incidents.create_index([("temple_id", ASCENDING)])
        await MongoDB.incidents.create_index([("date", DESCENDING)])
        await MongoDB.incidents.create_index([("incident_type", ASCENDING)])
        
        # Event logs indexes
        await MongoDB.event_logs.create_index([("event_type", ASCENDING)])
        await MongoDB.event_logs.create_index([("temple_id", ASCENDING)])
        await MongoDB.event_logs.create_index([("timestamp", DESCENDING)])
        # TTL index - remove event logs older than 30 days
        await MongoDB.event_logs.create_index(
            [("timestamp", DESCENDING)],
            expireAfterSeconds=30 * 24 * 60 * 60
        )
        
        logger.info("Database indexes created successfully")
        
    except Exception as e:
        logger.error(f"Error creating indexes: {e}")
        raise

async def get_database():
    """Get database instance for dependency injection"""
    return MongoDB.db

# Collection getters for dependency injection
async def get_users_collection():
    return MongoDB.users

async def get_bookings_collection():
    return MongoDB.bookings

async def get_crowd_data_collection():
    return MongoDB.crowd_data

async def get_shuttles_collection():
    return MongoDB.shuttles

async def get_emergencies_collection():
    return MongoDB.emergencies

async def get_alerts_collection():
    return MongoDB.alerts

async def get_resources_collection():
    return MongoDB.resources

async def get_footfall_data_collection():
    return MongoDB.footfall_data

async def get_daily_analytics_collection():
    return MongoDB.daily_analytics

async def get_incidents_collection():
    return MongoDB.incidents

async def get_event_logs_collection():
    return MongoDB.event_logs
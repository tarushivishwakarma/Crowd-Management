"""
MongoDB Schema Definitions for Pilgrims Window
These are Pydantic models that define the structure of documents in MongoDB
"""
from pydantic import BaseModel, Field, EmailStr, validator
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum

# ==================== ENUMS ====================

class UserRole(str, Enum):
    PILGRIM = "pilgrim"
    AUTHORITY = "authority"
    ADMIN = "admin"

class BookingStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    CANCELLED = "cancelled"
    COMPLETED = "completed"

class EmergencyType(str, Enum):
    MEDICAL = "medical"
    SECURITY = "security"
    CROWD_CONTROL = "crowd_control"
    LOST_CHILD = "lost_child"
    FIRE = "fire"
    OTHER = "other"

class EmergencyStatus(str, Enum):
    REPORTED = "reported"
    ACKNOWLEDGED = "acknowledged"
    IN_PROGRESS = "in_progress"
    RESOLVED = "resolved"

class CrowdStatus(str, Enum):
    LOW = "low"
    MODERATE = "moderate"
    HIGH = "high"
    CRITICAL = "critical"

class ShuttleStatus(str, Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    MAINTENANCE = "maintenance"

class AlertSeverity(str, Enum):
    INFO = "info"
    WARNING = "warning"
    CRITICAL = "critical"

class ResourceType(str, Enum):
    AMBULANCE = "ambulance"
    SECURITY = "security"
    CLEANING = "cleaning"
    WATER = "water"
    ELECTRICITY = "electricity"
    OTHER = "other"

# ==================== USER MODELS ====================

class UserBase(BaseModel):
    email: EmailStr
    phone: str
    full_name: str
    role: UserRole = UserRole.PILGRIM

class UserCreate(UserBase):
    password: str

class UserInDB(UserBase):
    id: str = Field(alias="_id")
    hashed_password: str
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True

class User(UserBase):
    id: str
    is_active: bool
    created_at: datetime
    
# ==================== BOOKING MODELS ====================

class ZoneBooking(BaseModel):
    zone_id: str
    zone_name: str
    capacity: int
    booked_slots: int

class BookingBase(BaseModel):
    user_id: str
    temple_id: str
    temple_name: str
    zone: str
    booking_date: datetime
    time_slot: str
    number_of_people: int = 1
    special_assistance: Optional[str] = None
    pilgrim_name: str
    pilgrim_phone: str
    
class BookingCreate(BookingBase):
    pass

class BookingInDB(BookingBase):
    id: str = Field(alias="_id")
    booking_id: str  # Human readable ID like BK1234567890
    status: BookingStatus = BookingStatus.CONFIRMED
    qr_code_url: str
    qr_code_data: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    checked_in: bool = False
    checked_in_at: Optional[datetime] = None
    
    class Config:
        populate_by_name = True

class Booking(BookingBase):
    id: str
    booking_id: str
    status: BookingStatus
    qr_code_url: str
    created_at: datetime

# ==================== CROWD MONITORING MODELS ====================

class ZoneCrowdData(BaseModel):
    zone_id: str
    zone_name: str
    density: float  # 0-100 percentage
    current_count: int
    max_capacity: int
    wait_time_minutes: int
    status: CrowdStatus
    last_updated: datetime = Field(default_factory=datetime.utcnow)

class CrowdDataPoint(BaseModel):
    temple_id: str
    temple_name: str
    zones: List[ZoneCrowdData]
    total_crowd: int
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    
class CrowdDataInDB(CrowdDataPoint):
    id: str = Field(alias="_id")
    
    class Config:
        populate_by_name = True

# ==================== TRANSPORT MODELS ====================

class ShuttleLocation(BaseModel):
    latitude: float
    longitude: float
    heading: Optional[float] = None

class ShuttleBase(BaseModel):
    shuttle_id: str
    shuttle_number: str
    route_name: str
    capacity: int
    current_passengers: int = 0
    driver_name: str
    driver_phone: str

class ShuttleCreate(ShuttleBase):
    pass

class ShuttleInDB(ShuttleBase):
    id: str = Field(alias="_id")
    status: ShuttleStatus = ShuttleStatus.ACTIVE
    current_location: ShuttleLocation
    next_stop: str
    eta_minutes: int
    last_updated: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True

class Shuttle(ShuttleBase):
    id: str
    status: ShuttleStatus
    current_location: ShuttleLocation
    next_stop: str
    eta_minutes: int

# ==================== EMERGENCY MODELS ====================

class LocationData(BaseModel):
    latitude: float
    longitude: float
    accuracy: Optional[float] = None

class EmergencyBase(BaseModel):
    type: EmergencyType
    description: str
    temple_id: str
    temple_name: str
    zone: Optional[str] = None
    location: LocationData
    reporter_name: str
    reporter_phone: str

class EmergencyCreate(EmergencyBase):
    user_id: Optional[str] = None

class EmergencyInDB(EmergencyBase):
    id: str = Field(alias="_id")
    emergency_id: str  # Human readable ID like EMG1234567890
    user_id: Optional[str] = None
    status: EmergencyStatus = EmergencyStatus.REPORTED
    assigned_to: Optional[str] = None  # Authority user ID
    created_at: datetime = Field(default_factory=datetime.utcnow)
    acknowledged_at: Optional[datetime] = None
    resolved_at: Optional[datetime] = None
    response_notes: Optional[str] = None
    
    class Config:
        populate_by_name = True

class Emergency(EmergencyBase):
    id: str
    emergency_id: str
    status: EmergencyStatus
    created_at: datetime

# ==================== ALERT MODELS ====================

class AlertBase(BaseModel):
    temple_id: str
    temple_name: str
    title: str
    message: str
    severity: AlertSeverity
    target_zones: Optional[List[str]] = None
    active: bool = True

class AlertCreate(AlertBase):
    created_by: str  # Authority user ID

class AlertInDB(AlertBase):
    id: str = Field(alias="_id")
    alert_id: str
    created_by: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    expires_at: Optional[datetime] = None
    views: int = 0
    
    class Config:
        populate_by_name = True

class Alert(AlertBase):
    id: str
    alert_id: str
    created_at: datetime

# ==================== RESOURCE MODELS ====================

class ResourceBase(BaseModel):
    temple_id: str
    resource_type: ResourceType
    resource_name: str
    description: Optional[str] = None
    quantity_available: int
    quantity_total: int
    location: str

class ResourceCreate(ResourceBase):
    pass

class ResourceInDB(ResourceBase):
    id: str = Field(alias="_id")
    status: str = "available"
    last_maintained: Optional[datetime] = None
    next_maintenance: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True

class Resource(ResourceBase):
    id: str
    status: str

# ==================== ANALYTICS MODELS ====================

class FootfallData(BaseModel):
    temple_id: str
    date: datetime
    hour: int  # 0-23
    zone: str
    count: int
    average_wait_time: float

class FootfallDataInDB(FootfallData):
    id: str = Field(alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True

class DailyAnalytics(BaseModel):
    temple_id: str
    date: datetime
    total_visitors: int
    total_bookings: int
    peak_hour: int
    peak_crowd: int
    average_wait_time: float
    emergencies_reported: int
    emergencies_resolved: int

class DailyAnalyticsInDB(DailyAnalytics):
    id: str = Field(alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True

# ==================== HISTORICAL INCIDENT MODELS ====================

class IncidentBase(BaseModel):
    temple_id: str
    temple_name: str
    incident_type: str
    date: datetime
    description: str
    zone: Optional[str] = None
    crowd_count: Optional[int] = None
    preventive_measures: List[str]

class IncidentCreate(IncidentBase):
    reported_by: str  # Authority user ID

class IncidentInDB(IncidentBase):
    id: str = Field(alias="_id")
    reported_by: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True

class Incident(IncidentBase):
    id: str
    created_at: datetime

# ==================== EVENT LOG MODELS ====================

class EventType(str, Enum):
    CROWD_UPDATE = "crowd_update"
    BOOKING = "booking"
    EMERGENCY = "emergency"
    ALERT = "alert"
    RESOURCE = "resource"
    SYSTEM = "system"

class EventLogBase(BaseModel):
    event_type: EventType
    temple_id: Optional[str] = None
    message: str
    metadata: Optional[Dict[str, Any]] = None

class EventLogInDB(EventLogBase):
    id: str = Field(alias="_id")
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True

class EventLog(EventLogBase):
    id: str
    timestamp: datetime
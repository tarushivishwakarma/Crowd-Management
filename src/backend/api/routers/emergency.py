"""
Emergency Management API Endpoints
Handles emergency SOS reports and response coordination
"""
from fastapi import APIRouter, HTTPException, Depends, status, BackgroundTasks
from typing import List, Optional
from datetime import datetime

from ...database.mongodb_schemas import (
    EmergencyCreate, Emergency, EmergencyInDB, EmergencyStatus, EmergencyType
)
from ...database.mongodb_connection import get_emergencies_collection, get_event_logs_collection
from ...config import settings
from ..dependencies import get_current_user, get_current_authority_user
from ...websocket.websocket_server import notify_emergency

router = APIRouter()

async def send_emergency_notifications(emergency_data: dict):
    """Send SMS/Email notifications for emergency"""
    # Implement Twilio SMS and SendGrid email notifications
    # This is a placeholder for actual implementation
    pass

@router.post("/", response_model=Emergency, status_code=status.HTTP_201_CREATED)
async def report_emergency(
    emergency: EmergencyCreate,
    background_tasks: BackgroundTasks,
    current_user = Depends(get_current_user),
    emergencies_collection = Depends(get_emergencies_collection),
    event_logs = Depends(get_event_logs_collection)
):
    """Report a new emergency"""
    
    # Validate temple
    if emergency.temple_id not in settings.TEMPLES:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Temple not found"
        )
    
    # Generate emergency ID
    emergency_id = f"EMG{int(datetime.utcnow().timestamp() * 1000)}"
    
    # Create emergency document
    emergency_doc = {
        **emergency.model_dump(),
        "user_id": str(current_user.get("_id")) if current_user else None,
        "emergency_id": emergency_id,
        "status": EmergencyStatus.REPORTED,
        "created_at": datetime.utcnow()
    }
    
    result = await emergencies_collection.insert_one(emergency_doc)
    
    # Log event
    await event_logs.insert_one({
        "event_type": "emergency",
        "temple_id": emergency.temple_id,
        "message": f"🚨 Emergency reported: {emergency.type} - {emergency_id}",
        "metadata": {
            "emergency_id": emergency_id,
            "type": emergency.type,
            "location": emergency.location.model_dump()
        },
        "timestamp": datetime.utcnow()
    })
    
    # Get created emergency
    created_emergency = await emergencies_collection.find_one({"_id": result.inserted_id})
    
    # Send real-time notifications
    background_tasks.add_task(notify_emergency, {
        "emergency_id": emergency_id,
        "type": emergency.type,
        "description": emergency.description,
        "temple_id": emergency.temple_id,
        "temple_name": emergency.temple_name,
        "zone": emergency.zone,
        "location": emergency.location.model_dump(),
        "reporter_name": emergency.reporter_name,
        "reporter_phone": emergency.reporter_phone,
        "created_at": created_emergency["created_at"].isoformat()
    })
    
    # Send SMS/Email notifications
    if settings.EMERGENCY_SMS_ENABLED:
        background_tasks.add_task(send_emergency_notifications, created_emergency)
    
    return Emergency(
        id=str(created_emergency["_id"]),
        **{k: v for k, v in created_emergency.items() if k != "_id"}
    )

@router.get("/temple/{temple_id}", response_model=List[Emergency])
async def get_temple_emergencies(
    temple_id: str,
    status_filter: Optional[EmergencyStatus] = None,
    type_filter: Optional[EmergencyType] = None,
    skip: int = 0,
    limit: int = 50,
    emergencies_collection = Depends(get_emergencies_collection),
    current_user = Depends(get_current_authority_user)
):
    """Get emergencies for a temple (Authority only)"""
    
    if temple_id not in settings.TEMPLES:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Temple not found"
        )
    
    query = {"temple_id": temple_id}
    
    if status_filter:
        query["status"] = status_filter
    
    if type_filter:
        query["type"] = type_filter
    
    cursor = emergencies_collection.find(query).sort("created_at", -1).skip(skip).limit(limit)
    emergencies = await cursor.to_list(length=limit)
    
    return [
        Emergency(id=str(e["_id"]), **{k: v for k, v in e.items() if k != "_id"})
        for e in emergencies
    ]

@router.get("/active", response_model=List[Emergency])
async def get_active_emergencies(
    skip: int = 0,
    limit: int = 100,
    emergencies_collection = Depends(get_emergencies_collection),
    current_user = Depends(get_current_authority_user)
):
    """Get all active emergencies (Authority only)"""
    
    query = {
        "status": {"$in": [EmergencyStatus.REPORTED, EmergencyStatus.ACKNOWLEDGED, EmergencyStatus.IN_PROGRESS]}
    }
    
    cursor = emergencies_collection.find(query).sort("created_at", -1).skip(skip).limit(limit)
    emergencies = await cursor.to_list(length=limit)
    
    return [
        Emergency(id=str(e["_id"]), **{k: v for k, v in e.items() if k != "_id"})
        for e in emergencies
    ]

@router.get("/{emergency_id}", response_model=Emergency)
async def get_emergency(
    emergency_id: str,
    emergencies_collection = Depends(get_emergencies_collection),
    current_user = Depends(get_current_authority_user)
):
    """Get specific emergency by ID (Authority only)"""
    
    emergency = await emergencies_collection.find_one({"emergency_id": emergency_id})
    
    if not emergency:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Emergency not found"
        )
    
    return Emergency(
        id=str(emergency["_id"]),
        **{k: v for k, v in emergency.items() if k != "_id"}
    )

@router.patch("/{emergency_id}/acknowledge")
async def acknowledge_emergency(
    emergency_id: str,
    current_user = Depends(get_current_authority_user),
    emergencies_collection = Depends(get_emergencies_collection),
    event_logs = Depends(get_event_logs_collection)
):
    """Acknowledge an emergency (Authority only)"""
    
    emergency = await emergencies_collection.find_one({"emergency_id": emergency_id})
    
    if not emergency:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Emergency not found"
        )
    
    if emergency["status"] != EmergencyStatus.REPORTED:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Emergency already acknowledged or resolved"
        )
    
    # Update status
    await emergencies_collection.update_one(
        {"_id": emergency["_id"]},
        {
            "$set": {
                "status": EmergencyStatus.ACKNOWLEDGED,
                "assigned_to": str(current_user["_id"]),
                "acknowledged_at": datetime.utcnow()
            }
        }
    )
    
    # Log event
    await event_logs.insert_one({
        "event_type": "emergency",
        "temple_id": emergency["temple_id"],
        "message": f"Emergency acknowledged: {emergency_id}",
        "metadata": {"emergency_id": emergency_id, "authority_id": str(current_user["_id"])},
        "timestamp": datetime.utcnow()
    })
    
    return {"message": "Emergency acknowledged successfully"}

@router.patch("/{emergency_id}/in-progress")
async def mark_emergency_in_progress(
    emergency_id: str,
    current_user = Depends(get_current_authority_user),
    emergencies_collection = Depends(get_emergencies_collection),
    event_logs = Depends(get_event_logs_collection)
):
    """Mark emergency as in progress (Authority only)"""
    
    emergency = await emergencies_collection.find_one({"emergency_id": emergency_id})
    
    if not emergency:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Emergency not found"
        )
    
    # Update status
    await emergencies_collection.update_one(
        {"_id": emergency["_id"]},
        {"$set": {"status": EmergencyStatus.IN_PROGRESS}}
    )
    
    # Log event
    await event_logs.insert_one({
        "event_type": "emergency",
        "temple_id": emergency["temple_id"],
        "message": f"Emergency response in progress: {emergency_id}",
        "metadata": {"emergency_id": emergency_id},
        "timestamp": datetime.utcnow()
    })
    
    return {"message": "Emergency marked as in progress"}

@router.patch("/{emergency_id}/resolve")
async def resolve_emergency(
    emergency_id: str,
    response_notes: str,
    current_user = Depends(get_current_authority_user),
    emergencies_collection = Depends(get_emergencies_collection),
    event_logs = Depends(get_event_logs_collection)
):
    """Resolve an emergency (Authority only)"""
    
    emergency = await emergencies_collection.find_one({"emergency_id": emergency_id})
    
    if not emergency:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Emergency not found"
        )
    
    if emergency["status"] == EmergencyStatus.RESOLVED:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Emergency already resolved"
        )
    
    # Update status
    await emergencies_collection.update_one(
        {"_id": emergency["_id"]},
        {
            "$set": {
                "status": EmergencyStatus.RESOLVED,
                "resolved_at": datetime.utcnow(),
                "response_notes": response_notes
            }
        }
    )
    
    # Log event
    await event_logs.insert_one({
        "event_type": "emergency",
        "temple_id": emergency["temple_id"],
        "message": f"Emergency resolved: {emergency_id}",
        "metadata": {"emergency_id": emergency_id, "notes": response_notes},
        "timestamp": datetime.utcnow()
    })
    
    return {"message": "Emergency resolved successfully"}

@router.get("/stats/temple/{temple_id}")
async def get_emergency_stats(
    temple_id: str,
    emergencies_collection = Depends(get_emergencies_collection),
    current_user = Depends(get_current_authority_user)
):
    """Get emergency statistics for a temple (Authority only)"""
    
    if temple_id not in settings.TEMPLES:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Temple not found"
        )
    
    # Get counts by status
    pipeline = [
        {"$match": {"temple_id": temple_id}},
        {"$group": {
            "_id": "$status",
            "count": {"$sum": 1}
        }}
    ]
    
    status_counts = {}
    async for doc in emergencies_collection.aggregate(pipeline):
        status_counts[doc["_id"]] = doc["count"]
    
    # Get counts by type
    pipeline = [
        {"$match": {"temple_id": temple_id}},
        {"$group": {
            "_id": "$type",
            "count": {"$sum": 1}
        }}
    ]
    
    type_counts = {}
    async for doc in emergencies_collection.aggregate(pipeline):
        type_counts[doc["_id"]] = doc["count"]
    
    # Calculate average response time
    pipeline = [
        {
            "$match": {
                "temple_id": temple_id,
                "status": EmergencyStatus.RESOLVED,
                "resolved_at": {"$exists": True}
            }
        },
        {
            "$project": {
                "response_time": {
                    "$subtract": ["$resolved_at", "$created_at"]
                }
            }
        },
        {
            "$group": {
                "_id": None,
                "avg_response_time_ms": {"$avg": "$response_time"}
            }
        }
    ]
    
    avg_response_time = None
    async for doc in emergencies_collection.aggregate(pipeline):
        avg_response_time = doc["avg_response_time_ms"] / 1000 / 60  # Convert to minutes
    
    return {
        "temple_id": temple_id,
        "status_breakdown": status_counts,
        "type_breakdown": type_counts,
        "average_response_time_minutes": avg_response_time
    }
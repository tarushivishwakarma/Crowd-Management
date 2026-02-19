"""
Alerts Management API Endpoints
Handles system-wide and temple-specific alerts
"""
from fastapi import APIRouter, HTTPException, Depends, status, BackgroundTasks
from typing import List, Optional
from datetime import datetime, timedelta

from ...database.mongodb_schemas import AlertCreate, Alert, AlertInDB, AlertSeverity
from ...database.mongodb_connection import get_alerts_collection, get_event_logs_collection
from ...config import settings
from ..dependencies import get_current_authority_user, get_current_user_optional
from ...websocket.websocket_server import notify_alert

router = APIRouter()

@router.post("/", response_model=Alert, status_code=status.HTTP_201_CREATED)
async def create_alert(
    alert: AlertCreate,
    background_tasks: BackgroundTasks,
    expires_in_hours: Optional[int] = 24,
    current_user = Depends(get_current_authority_user),
    alerts_collection = Depends(get_alerts_collection),
    event_logs = Depends(get_event_logs_collection)
):
    """Create a new alert (Authority only)"""
    
    if alert.temple_id not in settings.TEMPLES:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Temple not found"
        )
    
    # Generate alert ID
    alert_id = f"ALT{int(datetime.utcnow().timestamp() * 1000)}"
    
    # Calculate expiration
    expires_at = None
    if expires_in_hours:
        expires_at = datetime.utcnow() + timedelta(hours=expires_in_hours)
    
    # Create alert document
    alert_doc = {
        **alert.model_dump(),
        "alert_id": alert_id,
        "created_at": datetime.utcnow(),
        "expires_at": expires_at,
        "views": 0
    }
    
    result = await alerts_collection.insert_one(alert_doc)
    
    # Log event
    await event_logs.insert_one({
        "event_type": "alert",
        "temple_id": alert.temple_id,
        "message": f"New {alert.severity} alert: {alert.title}",
        "metadata": {"alert_id": alert_id, "severity": alert.severity},
        "timestamp": datetime.utcnow()
    })
    
    # Get created alert
    created_alert = await alerts_collection.find_one({"_id": result.inserted_id})
    
    # Send real-time notification
    background_tasks.add_task(notify_alert, {
        "alert_id": alert_id,
        "temple_id": alert.temple_id,
        "temple_name": alert.temple_name,
        "title": alert.title,
        "message": alert.message,
        "severity": alert.severity,
        "target_zones": alert.target_zones,
        "created_at": created_alert["created_at"].isoformat()
    })
    
    return Alert(
        id=str(created_alert["_id"]),
        **{k: v for k, v in created_alert.items() if k != "_id"}
    )

@router.get("/temple/{temple_id}", response_model=List[Alert])
async def get_temple_alerts(
    temple_id: str,
    active_only: bool = True,
    severity: Optional[AlertSeverity] = None,
    skip: int = 0,
    limit: int = 50,
    alerts_collection = Depends(get_alerts_collection)
):
    """Get alerts for a temple"""
    
    if temple_id not in settings.TEMPLES:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Temple not found"
        )
    
    query = {"temple_id": temple_id}
    
    if active_only:
        query["active"] = True
        query["$or"] = [
            {"expires_at": None},
            {"expires_at": {"$gt": datetime.utcnow()}}
        ]
    
    if severity:
        query["severity"] = severity
    
    cursor = alerts_collection.find(query).sort("created_at", -1).skip(skip).limit(limit)
    alerts = await cursor.to_list(length=limit)
    
    return [
        Alert(id=str(a["_id"]), **{k: v for k, v in a.items() if k != "_id"})
        for a in alerts
    ]

@router.get("/active", response_model=List[Alert])
async def get_all_active_alerts(
    skip: int = 0,
    limit: int = 100,
    alerts_collection = Depends(get_alerts_collection)
):
    """Get all active alerts across all temples"""
    
    query = {
        "active": True,
        "$or": [
            {"expires_at": None},
            {"expires_at": {"$gt": datetime.utcnow()}}
        ]
    }
    
    cursor = alerts_collection.find(query).sort("created_at", -1).skip(skip).limit(limit)
    alerts = await cursor.to_list(length=limit)
    
    return [
        Alert(id=str(a["_id"]), **{k: v for k, v in a.items() if k != "_id"})
        for a in alerts
    ]

@router.get("/{alert_id}", response_model=Alert)
async def get_alert(
    alert_id: str,
    alerts_collection = Depends(get_alerts_collection)
):
    """Get specific alert by ID"""
    
    alert = await alerts_collection.find_one({"alert_id": alert_id})
    
    if not alert:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Alert not found"
        )
    
    # Increment view count
    await alerts_collection.update_one(
        {"_id": alert["_id"]},
        {"$inc": {"views": 1}}
    )
    
    return Alert(
        id=str(alert["_id"]),
        **{k: v for k, v in alert.items() if k != "_id"}
    )

@router.patch("/{alert_id}/deactivate")
async def deactivate_alert(
    alert_id: str,
    current_user = Depends(get_current_authority_user),
    alerts_collection = Depends(get_alerts_collection),
    event_logs = Depends(get_event_logs_collection)
):
    """Deactivate an alert (Authority only)"""
    
    alert = await alerts_collection.find_one({"alert_id": alert_id})
    
    if not alert:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Alert not found"
        )
    
    if not alert.get("active", False):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Alert is already inactive"
        )
    
    # Deactivate alert
    await alerts_collection.update_one(
        {"_id": alert["_id"]},
        {"$set": {"active": False}}
    )
    
    # Log event
    await event_logs.insert_one({
        "event_type": "alert",
        "temple_id": alert["temple_id"],
        "message": f"Alert deactivated: {alert['title']}",
        "metadata": {"alert_id": alert_id},
        "timestamp": datetime.utcnow()
    })
    
    return {"message": "Alert deactivated successfully"}

@router.delete("/{alert_id}")
async def delete_alert(
    alert_id: str,
    current_user = Depends(get_current_authority_user),
    alerts_collection = Depends(get_alerts_collection)
):
    """Delete an alert (Authority only)"""
    
    alert = await alerts_collection.find_one({"alert_id": alert_id})
    
    if not alert:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Alert not found"
        )
    
    await alerts_collection.delete_one({"_id": alert["_id"]})
    
    return {"message": "Alert deleted successfully"}

@router.get("/stats/temple/{temple_id}")
async def get_alert_stats(
    temple_id: str,
    alerts_collection = Depends(get_alerts_collection),
    current_user = Depends(get_current_authority_user)
):
    """Get alert statistics for a temple (Authority only)"""
    
    if temple_id not in settings.TEMPLES:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Temple not found"
        )
    
    # Total alerts
    total = await alerts_collection.count_documents({"temple_id": temple_id})
    
    # Active alerts
    active = await alerts_collection.count_documents({
        "temple_id": temple_id,
        "active": True
    })
    
    # By severity
    pipeline = [
        {"$match": {"temple_id": temple_id}},
        {"$group": {
            "_id": "$severity",
            "count": {"$sum": 1}
        }}
    ]
    
    severity_counts = {}
    async for doc in alerts_collection.aggregate(pipeline):
        severity_counts[doc["_id"]] = doc["count"]
    
    # Total views
    pipeline = [
        {"$match": {"temple_id": temple_id}},
        {"$group": {
            "_id": None,
            "total_views": {"$sum": "$views"}
        }}
    ]
    
    total_views = 0
    async for doc in alerts_collection.aggregate(pipeline):
        total_views = doc["total_views"]
    
    return {
        "temple_id": temple_id,
        "total_alerts": total,
        "active_alerts": active,
        "severity_breakdown": severity_counts,
        "total_views": total_views
    }
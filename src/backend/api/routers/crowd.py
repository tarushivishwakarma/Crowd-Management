"""
Crowd Monitoring API Endpoints
Handles real-time crowd density data and analytics
"""
from fastapi import APIRouter, HTTPException, Depends, status
from typing import List, Optional
from datetime import datetime, timedelta

from ...database.mongodb_schemas import CrowdDataPoint, ZoneCrowdData, CrowdStatus
from ...database.mongodb_connection import get_crowd_data_collection, get_event_logs_collection
from ...config import settings
from ..dependencies import get_current_user, get_current_authority_user

router = APIRouter()

@router.get("/temple/{temple_id}/current")
async def get_current_crowd_data(
    temple_id: str,
    crowd_collection = Depends(get_crowd_data_collection)
):
    """Get current crowd data for a temple"""
    
    if temple_id not in settings.TEMPLES:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Temple not found"
        )
    
    # Get latest crowd data
    crowd_data = await crowd_collection.find_one(
        {"temple_id": temple_id},
        sort=[("timestamp", -1)]
    )
    
    if not crowd_data:
        # Return default data if no data exists
        temple_info = settings.TEMPLES[temple_id]
        return {
            "temple_id": temple_id,
            "temple_name": temple_info["name"],
            "zones": [
                {
                    "zone_id": zone,
                    "zone_name": zone.replace("_", " ").title(),
                    "density": 0,
                    "current_count": 0,
                    "max_capacity": 100,
                    "wait_time_minutes": 0,
                    "status": CrowdStatus.LOW,
                    "last_updated": datetime.utcnow()
                }
                for zone in temple_info["zones"]
            ],
            "total_crowd": 0,
            "timestamp": datetime.utcnow()
        }
    
    return crowd_data

@router.get("/temple/{temple_id}/history")
async def get_crowd_history(
    temple_id: str,
    hours: int = 24,
    zone: Optional[str] = None,
    crowd_collection = Depends(get_crowd_data_collection)
):
    """Get historical crowd data for a temple"""
    
    if temple_id not in settings.TEMPLES:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Temple not found"
        )
    
    # Calculate time range
    start_time = datetime.utcnow() - timedelta(hours=hours)
    
    # Query crowd data
    query = {
        "temple_id": temple_id,
        "timestamp": {"$gte": start_time}
    }
    
    cursor = crowd_collection.find(query).sort("timestamp", 1)
    history = await cursor.to_list(length=1000)
    
    # Filter by zone if specified
    if zone:
        filtered_history = []
        for record in history:
            zones_data = record.get("zones", [])
            zone_data = next((z for z in zones_data if z["zone_id"] == zone), None)
            if zone_data:
                filtered_history.append({
                    "timestamp": record["timestamp"],
                    "zone_data": zone_data
                })
        return filtered_history
    
    return history

@router.post("/temple/{temple_id}/update", status_code=status.HTTP_201_CREATED)
async def update_crowd_data(
    temple_id: str,
    crowd_data: CrowdDataPoint,
    current_user = Depends(get_current_authority_user),
    crowd_collection = Depends(get_crowd_data_collection),
    event_logs = Depends(get_event_logs_collection)
):
    """Update crowd data for a temple (Authority only)"""
    
    if temple_id not in settings.TEMPLES:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Temple not found"
        )
    
    # Validate zones
    temple_info = settings.TEMPLES[temple_id]
    valid_zones = set(temple_info["zones"])
    provided_zones = {zone.zone_id for zone in crowd_data.zones}
    
    if not provided_zones.issubset(valid_zones):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid zones. Valid zones for {temple_id}: {', '.join(valid_zones)}"
        )
    
    # Insert crowd data
    crowd_doc = {
        **crowd_data.model_dump(),
        "timestamp": datetime.utcnow()
    }
    
    await crowd_collection.insert_one(crowd_doc)
    
    # Log high density zones
    for zone in crowd_data.zones:
        if zone.status in [CrowdStatus.HIGH, CrowdStatus.CRITICAL]:
            await event_logs.insert_one({
                "event_type": "crowd_update",
                "temple_id": temple_id,
                "message": f"{zone.zone_name} at {zone.status} density: {zone.density:.1f}%",
                "metadata": {"zone": zone.zone_id, "density": zone.density},
                "timestamp": datetime.utcnow()
            })
    
    return {"message": "Crowd data updated successfully"}

@router.get("/temple/{temple_id}/heatmap")
async def get_crowd_heatmap(
    temple_id: str,
    date: Optional[datetime] = None,
    crowd_collection = Depends(get_crowd_data_collection),
    current_user = Depends(get_current_authority_user)
):
    """Get crowd heatmap data for analytics (Authority only)"""
    
    if temple_id not in settings.TEMPLES:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Temple not found"
        )
    
    if not date:
        date = datetime.utcnow()
    
    # Get data for the entire day
    start_of_day = date.replace(hour=0, minute=0, second=0, microsecond=0)
    end_of_day = start_of_day + timedelta(days=1)
    
    query = {
        "temple_id": temple_id,
        "timestamp": {"$gte": start_of_day, "$lt": end_of_day}
    }
    
    cursor = crowd_collection.find(query).sort("timestamp", 1)
    data_points = await cursor.to_list(length=None)
    
    # Organize data by hour and zone
    heatmap = {}
    
    for point in data_points:
        hour = point["timestamp"].hour
        
        if hour not in heatmap:
            heatmap[hour] = {}
        
        for zone in point.get("zones", []):
            zone_id = zone["zone_id"]
            
            if zone_id not in heatmap[hour]:
                heatmap[hour][zone_id] = []
            
            heatmap[hour][zone_id].append({
                "density": zone["density"],
                "count": zone["current_count"],
                "timestamp": point["timestamp"]
            })
    
    # Calculate averages
    heatmap_avg = {}
    for hour, zones in heatmap.items():
        heatmap_avg[hour] = {}
        for zone_id, readings in zones.items():
            avg_density = sum(r["density"] for r in readings) / len(readings)
            avg_count = sum(r["count"] for r in readings) / len(readings)
            
            heatmap_avg[hour][zone_id] = {
                "average_density": avg_density,
                "average_count": avg_count,
                "readings_count": len(readings)
            }
    
    return {
        "temple_id": temple_id,
        "date": date.date().isoformat(),
        "heatmap": heatmap_avg
    }

@router.get("/temple/{temple_id}/predictions")
async def get_crowd_predictions(
    temple_id: str,
    crowd_collection = Depends(get_crowd_data_collection)
):
    """Get predicted crowd levels based on historical data"""
    
    if temple_id not in settings.TEMPLES:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Temple not found"
        )
    
    # Get historical data for same day of week and time
    current_time = datetime.utcnow()
    day_of_week = current_time.weekday()
    current_hour = current_time.hour
    
    # Get data from last 4 weeks for same day and hour
    predictions = []
    
    for weeks_ago in range(1, 5):
        target_date = current_time - timedelta(weeks=weeks_ago)
        start_time = target_date.replace(minute=0, second=0, microsecond=0)
        end_time = start_time + timedelta(hours=1)
        
        query = {
            "temple_id": temple_id,
            "timestamp": {"$gte": start_time, "$lt": end_time}
        }
        
        data = await crowd_collection.find_one(query, sort=[("timestamp", -1)])
        
        if data:
            predictions.append({
                "week_ago": weeks_ago,
                "zones": data.get("zones", []),
                "total_crowd": data.get("total_crowd", 0)
            })
    
    if not predictions:
        return {
            "temple_id": temple_id,
            "predicted_crowd": "No historical data available",
            "confidence": "low"
        }
    
    # Calculate average prediction
    zone_predictions = {}
    temple_info = settings.TEMPLES[temple_id]
    
    for zone_id in temple_info["zones"]:
        zone_densities = []
        for pred in predictions:
            for zone in pred.get("zones", []):
                if zone.get("zone_id") == zone_id:
                    zone_densities.append(zone.get("density", 0))
        
        if zone_densities:
            avg_density = sum(zone_densities) / len(zone_densities)
            zone_predictions[zone_id] = {
                "predicted_density": avg_density,
                "confidence": "high" if len(zone_densities) >= 3 else "medium"
            }
    
    return {
        "temple_id": temple_id,
        "day_of_week": day_of_week,
        "hour": current_hour,
        "zone_predictions": zone_predictions,
        "based_on_weeks": len(predictions)
    }
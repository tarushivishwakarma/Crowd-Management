"""
Transport Assistance API Endpoints
Handles shuttle tracking and route information
"""
from fastapi import APIRouter, HTTPException, Depends, status
from typing import List, Optional
from datetime import datetime

from ...database.mongodb_schemas import ShuttleCreate, Shuttle, ShuttleInDB, ShuttleStatus, ShuttleLocation
from ...database.mongodb_connection import get_shuttles_collection, get_event_logs_collection
from ...config import settings
from ..dependencies import get_current_authority_user, get_current_user_optional

router = APIRouter()

@router.get("/temple/{temple_id}/shuttles", response_model=List[Shuttle])
async def get_temple_shuttles(
    temple_id: str,
    status_filter: Optional[ShuttleStatus] = None,
    shuttles_collection = Depends(get_shuttles_collection)
):
    """Get all shuttles for a temple"""
    
    if temple_id not in settings.TEMPLES:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Temple not found"
        )
    
    query = {"temple_id": temple_id}
    
    if status_filter:
        query["status"] = status_filter
    else:
        # By default, only show active shuttles to public
        query["status"] = ShuttleStatus.ACTIVE
    
    cursor = shuttles_collection.find(query)
    shuttles = await cursor.to_list(length=100)
    
    return [
        Shuttle(id=str(s["_id"]), **{k: v for k, v in s.items() if k != "_id"})
        for s in shuttles
    ]

@router.get("/shuttle/{shuttle_id}", response_model=Shuttle)
async def get_shuttle(
    shuttle_id: str,
    shuttles_collection = Depends(get_shuttles_collection)
):
    """Get specific shuttle details"""
    
    shuttle = await shuttles_collection.find_one({"shuttle_id": shuttle_id})
    
    if not shuttle:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shuttle not found"
        )
    
    return Shuttle(
        id=str(shuttle["_id"]),
        **{k: v for k, v in shuttle.items() if k != "_id"}
    )

@router.post("/", response_model=Shuttle, status_code=status.HTTP_201_CREATED)
async def create_shuttle(
    shuttle: ShuttleCreate,
    initial_location: ShuttleLocation,
    next_stop: str,
    eta_minutes: int,
    temple_id: str,
    current_user = Depends(get_current_authority_user),
    shuttles_collection = Depends(get_shuttles_collection),
    event_logs = Depends(get_event_logs_collection)
):
    """Create a new shuttle (Authority only)"""
    
    if temple_id not in settings.TEMPLES:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Temple not found"
        )
    
    # Check if shuttle already exists
    existing = await shuttles_collection.find_one({"shuttle_id": shuttle.shuttle_id})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Shuttle ID already exists"
        )
    
    # Create shuttle document
    shuttle_doc = {
        **shuttle.model_dump(),
        "temple_id": temple_id,
        "status": ShuttleStatus.ACTIVE,
        "current_location": initial_location.model_dump(),
        "next_stop": next_stop,
        "eta_minutes": eta_minutes,
        "last_updated": datetime.utcnow()
    }
    
    result = await shuttles_collection.insert_one(shuttle_doc)
    
    # Log event
    await event_logs.insert_one({
        "event_type": "system",
        "temple_id": temple_id,
        "message": f"New shuttle added: {shuttle.shuttle_number}",
        "metadata": {"shuttle_id": shuttle.shuttle_id},
        "timestamp": datetime.utcnow()
    })
    
    # Return created shuttle
    created_shuttle = await shuttles_collection.find_one({"_id": result.inserted_id})
    return Shuttle(
        id=str(created_shuttle["_id"]),
        **{k: v for k, v in created_shuttle.items() if k != "_id"}
    )

@router.patch("/shuttle/{shuttle_id}/location")
async def update_shuttle_location(
    shuttle_id: str,
    location: ShuttleLocation,
    next_stop: str,
    eta_minutes: int,
    current_passengers: Optional[int] = None,
    current_user = Depends(get_current_authority_user),
    shuttles_collection = Depends(get_shuttles_collection)
):
    """Update shuttle location and status (Authority only)"""
    
    shuttle = await shuttles_collection.find_one({"shuttle_id": shuttle_id})
    
    if not shuttle:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shuttle not found"
        )
    
    update_data = {
        "current_location": location.model_dump(),
        "next_stop": next_stop,
        "eta_minutes": eta_minutes,
        "last_updated": datetime.utcnow()
    }
    
    if current_passengers is not None:
        update_data["current_passengers"] = current_passengers
    
    # Update shuttle
    await shuttles_collection.update_one(
        {"_id": shuttle["_id"]},
        {"$set": update_data}
    )
    
    return {"message": "Shuttle location updated successfully"}

@router.patch("/shuttle/{shuttle_id}/status")
async def update_shuttle_status(
    shuttle_id: str,
    new_status: ShuttleStatus,
    current_user = Depends(get_current_authority_user),
    shuttles_collection = Depends(get_shuttles_collection),
    event_logs = Depends(get_event_logs_collection)
):
    """Update shuttle status (Authority only)"""
    
    shuttle = await shuttles_collection.find_one({"shuttle_id": shuttle_id})
    
    if not shuttle:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shuttle not found"
        )
    
    # Update status
    await shuttles_collection.update_one(
        {"_id": shuttle["_id"]},
        {"$set": {"status": new_status, "last_updated": datetime.utcnow()}}
    )
    
    # Log event
    await event_logs.insert_one({
        "event_type": "system",
        "temple_id": shuttle.get("temple_id"),
        "message": f"Shuttle {shuttle['shuttle_number']} status changed to {new_status}",
        "metadata": {"shuttle_id": shuttle_id, "status": new_status},
        "timestamp": datetime.utcnow()
    })
    
    return {"message": f"Shuttle status updated to {new_status}"}

@router.delete("/shuttle/{shuttle_id}")
async def delete_shuttle(
    shuttle_id: str,
    current_user = Depends(get_current_authority_user),
    shuttles_collection = Depends(get_shuttles_collection)
):
    """Delete a shuttle (Authority only)"""
    
    shuttle = await shuttles_collection.find_one({"shuttle_id": shuttle_id})
    
    if not shuttle:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shuttle not found"
        )
    
    await shuttles_collection.delete_one({"_id": shuttle["_id"]})
    
    return {"message": "Shuttle deleted successfully"}

@router.get("/routes/temple/{temple_id}")
async def get_temple_routes(
    temple_id: str,
    shuttles_collection = Depends(get_shuttles_collection)
):
    """Get all unique routes for a temple"""
    
    if temple_id not in settings.TEMPLES:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Temple not found"
        )
    
    # Get distinct routes
    routes = await shuttles_collection.distinct("route_name", {"temple_id": temple_id})
    
    # Get shuttle count per route
    route_info = []
    for route in routes:
        count = await shuttles_collection.count_documents({
            "temple_id": temple_id,
            "route_name": route,
            "status": ShuttleStatus.ACTIVE
        })
        
        route_info.append({
            "route_name": route,
            "active_shuttles": count
        })
    
    return route_info
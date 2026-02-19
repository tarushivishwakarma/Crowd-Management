"""
Booking Management API Endpoints
Handles darshan booking with QR code generation
"""
from fastapi import APIRouter, HTTPException, Depends, status
from typing import List, Optional
from datetime import datetime, timedelta
import qrcode
import io
import base64
from bson import ObjectId

from ...database.mongodb_schemas import (
    BookingCreate, Booking, BookingInDB, BookingStatus
)
from ...database.mongodb_connection import get_bookings_collection, get_event_logs_collection
from ...config import settings
from ..dependencies import get_current_user, get_current_authority_user

router = APIRouter()

async def generate_qr_code(booking_data: dict) -> tuple[str, str]:
    """Generate QR code for booking"""
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=settings.QR_CODE_SIZE // 30,
        border=settings.QR_CODE_BORDER,
    )
    
    # QR code data format
    qr_data = f"PW-BOOKING:{booking_data['booking_id']}:{booking_data['temple_id']}:{booking_data['booking_date']}"
    qr.add_data(qr_data)
    qr.make(fit=True)
    
    # Create image
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Convert to base64
    buffer = io.BytesIO()
    img.save(buffer, format='PNG')
    img_str = base64.b64encode(buffer.getvalue()).decode()
    qr_code_url = f"data:image/png;base64,{img_str}"
    
    return qr_code_url, qr_data

@router.post("/", response_model=Booking, status_code=status.HTTP_201_CREATED)
async def create_booking(
    booking: BookingCreate,
    current_user = Depends(get_current_user),
    bookings_collection = Depends(get_bookings_collection),
    event_logs = Depends(get_event_logs_collection)
):
    """Create a new darshan booking with QR code"""
    
    # Check if temple exists
    if booking.temple_id not in settings.TEMPLES:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Temple not found"
        )
    
    # Check slot availability
    existing_bookings = await bookings_collection.count_documents({
        "temple_id": booking.temple_id,
        "booking_date": booking.booking_date,
        "time_slot": booking.time_slot,
        "status": {"$in": [BookingStatus.CONFIRMED, BookingStatus.PENDING]}
    })
    
    # Maximum 50 bookings per slot (configurable per temple)
    MAX_BOOKINGS_PER_SLOT = 50
    if existing_bookings >= MAX_BOOKINGS_PER_SLOT:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="This time slot is fully booked"
        )
    
    # Generate booking ID
    booking_id = f"BK{int(datetime.utcnow().timestamp() * 1000)}"
    
    # Generate QR code
    booking_data = {
        "booking_id": booking_id,
        "temple_id": booking.temple_id,
        "booking_date": booking.booking_date.isoformat()
    }
    qr_code_url, qr_code_data = await generate_qr_code(booking_data)
    
    # Create booking document
    booking_doc = {
        **booking.model_dump(),
        "user_id": str(current_user["_id"]),
        "booking_id": booking_id,
        "status": BookingStatus.CONFIRMED,
        "qr_code_url": qr_code_url,
        "qr_code_data": qr_code_data,
        "created_at": datetime.utcnow(),
        "checked_in": False,
        "checked_in_at": None
    }
    
    result = await bookings_collection.insert_one(booking_doc)
    
    # Log event
    await event_logs.insert_one({
        "event_type": "booking",
        "temple_id": booking.temple_id,
        "message": f"New booking created: {booking_id} for {booking.zone}",
        "metadata": {"booking_id": booking_id, "user_id": str(current_user["_id"])},
        "timestamp": datetime.utcnow()
    })
    
    # Return created booking
    created_booking = await bookings_collection.find_one({"_id": result.inserted_id})
    return Booking(
        id=str(created_booking["_id"]),
        **{k: v for k, v in created_booking.items() if k != "_id"}
    )

@router.get("/my-bookings", response_model=List[Booking])
async def get_my_bookings(
    current_user = Depends(get_current_user),
    bookings_collection = Depends(get_bookings_collection),
    status_filter: Optional[BookingStatus] = None,
    skip: int = 0,
    limit: int = 50
):
    """Get current user's bookings"""
    
    query = {"user_id": str(current_user["_id"])}
    if status_filter:
        query["status"] = status_filter
    
    cursor = bookings_collection.find(query).sort("created_at", -1).skip(skip).limit(limit)
    bookings = await cursor.to_list(length=limit)
    
    return [
        Booking(id=str(b["_id"]), **{k: v for k, v in b.items() if k != "_id"})
        for b in bookings
    ]

@router.get("/{booking_id}", response_model=Booking)
async def get_booking(
    booking_id: str,
    current_user = Depends(get_current_user),
    bookings_collection = Depends(get_bookings_collection)
):
    """Get specific booking by ID"""
    
    booking = await bookings_collection.find_one({"booking_id": booking_id})
    
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )
    
    # Check if user owns this booking or is authority
    if booking["user_id"] != str(current_user["_id"]) and current_user.get("role") != "authority":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to view this booking"
        )
    
    return Booking(
        id=str(booking["_id"]),
        **{k: v for k, v in booking.items() if k != "_id"}
    )

@router.patch("/{booking_id}/cancel")
async def cancel_booking(
    booking_id: str,
    current_user = Depends(get_current_user),
    bookings_collection = Depends(get_bookings_collection),
    event_logs = Depends(get_event_logs_collection)
):
    """Cancel a booking"""
    
    booking = await bookings_collection.find_one({"booking_id": booking_id})
    
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )
    
    if booking["user_id"] != str(current_user["_id"]):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to cancel this booking"
        )
    
    if booking["status"] == BookingStatus.CANCELLED:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Booking already cancelled"
        )
    
    # Update booking status
    await bookings_collection.update_one(
        {"_id": booking["_id"]},
        {"$set": {"status": BookingStatus.CANCELLED}}
    )
    
    # Log event
    await event_logs.insert_one({
        "event_type": "booking",
        "temple_id": booking["temple_id"],
        "message": f"Booking cancelled: {booking_id}",
        "metadata": {"booking_id": booking_id},
        "timestamp": datetime.utcnow()
    })
    
    return {"message": "Booking cancelled successfully"}

@router.post("/{booking_id}/checkin")
async def checkin_booking(
    booking_id: str,
    current_user = Depends(get_current_authority_user),
    bookings_collection = Depends(get_bookings_collection),
    event_logs = Depends(get_event_logs_collection)
):
    """Check-in a booking (Authority only)"""
    
    booking = await bookings_collection.find_one({"booking_id": booking_id})
    
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )
    
    if booking["status"] != BookingStatus.CONFIRMED:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Booking is not confirmed"
        )
    
    if booking["checked_in"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Already checked in"
        )
    
    # Update check-in status
    await bookings_collection.update_one(
        {"_id": booking["_id"]},
        {
            "$set": {
                "checked_in": True,
                "checked_in_at": datetime.utcnow(),
                "status": BookingStatus.COMPLETED
            }
        }
    )
    
    # Log event
    await event_logs.insert_one({
        "event_type": "booking",
        "temple_id": booking["temple_id"],
        "message": f"Booking checked in: {booking_id}",
        "metadata": {"booking_id": booking_id},
        "timestamp": datetime.utcnow()
    })
    
    return {"message": "Check-in successful"}

@router.get("/temple/{temple_id}/slots")
async def get_available_slots(
    temple_id: str,
    date: datetime,
    bookings_collection = Depends(get_bookings_collection)
):
    """Get available time slots for a temple on a specific date"""
    
    if temple_id not in settings.TEMPLES:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Temple not found"
        )
    
    # Define time slots
    time_slots = [
        "06:00-08:00", "08:00-10:00", "10:00-12:00",
        "12:00-14:00", "14:00-16:00", "16:00-18:00",
        "18:00-20:00", "20:00-22:00"
    ]
    
    # Check availability for each slot
    MAX_BOOKINGS_PER_SLOT = 50
    available_slots = []
    
    for slot in time_slots:
        bookings_count = await bookings_collection.count_documents({
            "temple_id": temple_id,
            "booking_date": date,
            "time_slot": slot,
            "status": {"$in": [BookingStatus.CONFIRMED, BookingStatus.PENDING]}
        })
        
        available_slots.append({
            "time_slot": slot,
            "available": bookings_count < MAX_BOOKINGS_PER_SLOT,
            "booked": bookings_count,
            "capacity": MAX_BOOKINGS_PER_SLOT
        })
    
    return available_slots
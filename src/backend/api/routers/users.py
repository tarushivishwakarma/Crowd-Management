"""
User Management API Endpoints
"""
from fastapi import APIRouter, HTTPException, Depends, status
from typing import List

from ...database.mongodb_schemas import User, UserInDB
from ...database.mongodb_connection import get_users_collection
from ..dependencies import get_current_user, get_current_admin_user

router = APIRouter()

@router.get("/me", response_model=User)
async def get_current_user_info(
    current_user = Depends(get_current_user)
):
    """Get current user information"""
    return User(
        id=str(current_user["_id"]),
        email=current_user["email"],
        phone=current_user["phone"],
        full_name=current_user["full_name"],
        role=current_user["role"],
        is_active=current_user["is_active"],
        created_at=current_user["created_at"]
    )

@router.patch("/me")
async def update_current_user(
    full_name: str = None,
    phone: str = None,
    current_user = Depends(get_current_user),
    users_collection = Depends(get_users_collection)
):
    """Update current user information"""
    
    update_data = {}
    
    if full_name:
        update_data["full_name"] = full_name
    
    if phone:
        # Check if phone already in use
        existing = await users_collection.find_one({
            "phone": phone,
            "_id": {"$ne": current_user["_id"]}
        })
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Phone number already in use"
            )
        update_data["phone"] = phone
    
    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No fields to update"
        )
    
    await users_collection.update_one(
        {"_id": current_user["_id"]},
        {"$set": update_data}
    )
    
    return {"message": "User updated successfully"}

@router.get("/", response_model=List[User])
async def list_users(
    skip: int = 0,
    limit: int = 50,
    current_user = Depends(get_current_admin_user),
    users_collection = Depends(get_users_collection)
):
    """List all users (Admin only)"""
    
    cursor = users_collection.find().skip(skip).limit(limit)
    users = await cursor.to_list(length=limit)
    
    return [
        User(
            id=str(u["_id"]),
            email=u["email"],
            phone=u["phone"],
            full_name=u["full_name"],
            role=u["role"],
            is_active=u["is_active"],
            created_at=u["created_at"]
        )
        for u in users
    ]
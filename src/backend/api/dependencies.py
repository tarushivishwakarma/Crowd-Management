"""
FastAPI Dependencies for Authentication and Authorization
"""
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from datetime import datetime

from ..config import settings
from ..database.mongodb_connection import get_users_collection

security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    users_collection = Depends(get_users_collection)
):
    """Get current authenticated user"""
    
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        token = credentials.credentials
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        
        if user_id is None:
            raise credentials_exception
            
    except JWTError:
        raise credentials_exception
    
    # Get user from database
    user = await users_collection.find_one({"_id": user_id})
    
    if user is None:
        raise credentials_exception
    
    if not user.get("is_active", False):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive"
        )
    
    return user

async def get_current_authority_user(
    current_user = Depends(get_current_user)
):
    """Verify user has authority role"""
    
    if current_user.get("role") not in ["authority", "admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized. Authority role required."
        )
    
    return current_user

async def get_current_admin_user(
    current_user = Depends(get_current_user)
):
    """Verify user has admin role"""
    
    if current_user.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized. Admin role required."
        )
    
    return current_user

# Optional authentication - returns None if not authenticated
async def get_current_user_optional(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    users_collection = Depends(get_users_collection)
):
    """Get current user if authenticated, None otherwise"""
    
    if not credentials:
        return None
    
    try:
        return await get_current_user(credentials, users_collection)
    except HTTPException:
        return None
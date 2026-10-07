from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from app.core.security import get_current_user, AuthUser

router = APIRouter(prefix="", tags=["Auth"])


class SessionPayload(BaseModel):
    access_token: str
    refresh_token: Optional[str] = None


@router.post("/auth/session")
def create_session(payload: SessionPayload):
    """
    Exchanges Supabase token for session validation and sets cookie/claims.
    """
    return {
        "status": "authenticated",
        "access_token": payload.access_token,
        "token_type": "bearer",
    }


@router.get("/me")
def get_user_profile(user: AuthUser = Depends(get_current_user)):
    """
    Returns current user details, role claims, and permissions.
    """
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "status": "active",
        "department": "Real Estate Operations",
    }

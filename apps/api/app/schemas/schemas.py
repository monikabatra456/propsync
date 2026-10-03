from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Any
from datetime import datetime


class UserBase(BaseModel):
    name: str
    email: str
    role: str = "field"
    status: str = "active"
    department: Optional[str] = None


class UserResponse(UserBase):
    id: str
    created_at: Optional[datetime] = None


class FloorCreate(BaseModel):
    floor: str
    carpet_area_sqft: float
    built_up_area_sqft: float
    rent_per_sqft: float
    availability: str = "Available"
    facilities: Optional[str] = None


class ComplianceDocCreate(BaseModel):
    name: str
    type: str
    status: str = "pending"
    valid_until: Optional[str] = None
    expected_date: Optional[str] = None
    remarks: Optional[str] = None
    doc_number: Optional[str] = None
    file_url: Optional[str] = None


class ContactCreate(BaseModel):
    name: str
    role: str
    phone: str
    email: Optional[str] = None


class PropertyCreate(BaseModel):
    title: str
    location: str
    locality: str
    district: str
    pin_code: str
    latitude: float
    longitude: float
    accuracy_m: Optional[float] = 5.0
    status: str = "available"
    area_sqft: float
    land_use: str = "Office"
    rent_per_sqft: float
    security_deposit: Optional[str] = "3 Months"
    maintenance: Optional[float] = 0.0
    lease_term: Optional[str] = "3 Years"
    lock_in_period: Optional[str] = "1 Year"
    building_name: Optional[str] = None
    building_age: Optional[str] = None
    total_floors: Optional[int] = 1
    listed_by: Optional[str] = "PropSync Broker"
    description: Optional[str] = None
    images: List[str] = Field(default_factory=list)
    video_url: Optional[str] = None
    floors: List[FloorCreate] = Field(default_factory=list)
    amenities: List[str] = Field(default_factory=list)
    compliance_docs: List[ComplianceDocCreate] = Field(default_factory=list)
    contacts: List[ContactCreate] = Field(default_factory=list)


class PropertyUpdate(BaseModel):
    title: Optional[str] = None
    location: Optional[str] = None
    status: Optional[str] = None
    rent_per_sqft: Optional[float] = None
    description: Optional[str] = None


class PropertyResponse(PropertyCreate):
    id: str
    created_at: Optional[datetime] = None


class PropertyStats(BaseModel):
    total_properties: int
    available: int
    under_negotiation: int
    under_verification: int
    rented: int


class FollowupCreate(BaseModel):
    date: str
    time: str
    channel: str
    contact_name: str
    notes: str
    status: str = "scheduled"


class MediaSignedUrlRequest(BaseModel):
    filename: str
    content_type: str
    property_id: Optional[str] = None


class MediaSignedUrlResponse(BaseModel):
    upload_url: str
    media_id: str
    file_path: str


class AdminStats(BaseModel):
    total_properties: int
    active_field_agents: int
    total_users: int
    storage_usage_gb: float
    storage_limit_gb: float


class ApprovalAction(BaseModel):
    decision: str = "approve" # approve | reject
    remarks: Optional[str] = None

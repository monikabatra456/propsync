"""Expert Company database models — every table includes:
id (uuid), created_at, updated_at, created_by, is_deleted.
"""
import uuid
from datetime import datetime
from sqlalchemy import (
    Column, String, Integer, Float, Boolean, DateTime,
    ForeignKey, Text, Enum as SAEnum,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum


# ---------------------------------------------------------------------------
# Enums
# ---------------------------------------------------------------------------

class UserRoleEnum(str, enum.Enum):
    admin = "admin"
    sales = "sales"
    space_sales = "space_sales"
    field = "field"
    owner = "owner"


class UserStatusEnum(str, enum.Enum):
    active = "active"
    pending = "pending"
    disabled = "disabled"


class PropertyAvailabilityEnum(str, enum.Enum):
    available = "available"
    under_verification = "under_verification"
    under_negotiation = "under_negotiation"
    rented = "rented"


class LandUseEnum(str, enum.Enum):
    office = "Office"
    retail = "Retail"
    industrial = "Industrial"
    commercial = "Commercial"
    residential = "Residential"


class ComplianceStatusEnum(str, enum.Enum):
    verified = "verified"
    valid = "valid"
    pending = "pending"
    expired = "expired"


class AuditActionEnum(str, enum.Enum):
    view = "view"
    create = "create"
    edit = "edit"
    delete = "delete"
    login = "login"
    export = "export"


# ---------------------------------------------------------------------------
# Mixin
# ---------------------------------------------------------------------------

class TimestampMixin:
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    created_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    is_deleted = Column(Boolean, default=False, nullable=False)


# ---------------------------------------------------------------------------
# Users
# ---------------------------------------------------------------------------

class User(Base, TimestampMixin):
    __tablename__ = "users"

    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    supabase_uid = Column(String(255), unique=True, nullable=True, index=True)
    role = Column(SAEnum(UserRoleEnum), nullable=False, default=UserRoleEnum.sales)
    status = Column(SAEnum(UserStatusEnum), nullable=False, default=UserStatusEnum.pending)
    department = Column(String(255), nullable=True)
    last_login = Column(DateTime, nullable=True)
    avatar_url = Column(String(512), nullable=True)


# ---------------------------------------------------------------------------
# Properties
# ---------------------------------------------------------------------------

class Property(Base, TimestampMixin):
    __tablename__ = "properties"

    name = Column(String(255), nullable=False, index=True)
    owner_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)

    # Location
    district = Column(String(255), nullable=False, index=True)
    locality = Column(String(255), nullable=False, index=True)
    pin_code = Column(String(10), nullable=True)
    address = Column(Text, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    accuracy_m = Column(Float, nullable=True)
    gps_source = Column(String(100), nullable=True)

    # Specs
    land_use = Column(SAEnum(LandUseEnum), nullable=True, index=True)
    total_area_sqft = Column(Float, nullable=False, default=0)
    rent_per_sqft = Column(Float, nullable=True)
    security_deposit_months = Column(Integer, nullable=True)
    maintenance_per_sqft = Column(Float, nullable=True)
    lease_term = Column(String(255), nullable=True)
    availability = Column(
        SAEnum(PropertyAvailabilityEnum),
        nullable=False,
        default=PropertyAvailabilityEnum.available,
        index=True,
    )
    description = Column(Text, nullable=True)

    # Listed by (brokerage / agent company)
    listed_by = Column(String(255), nullable=True)

    # Relationships
    floors = relationship("Floor", back_populates="property", lazy="dynamic")
    media = relationship("PropertyMedia", back_populates="property", lazy="dynamic")
    compliance_docs = relationship("ComplianceDoc", back_populates="property", lazy="dynamic")
    contacts = relationship("Contact", back_populates="property", lazy="dynamic")
    commercials = relationship("Commercial", back_populates="property", uselist=False)
    followups = relationship("AvailabilityFollowup", back_populates="property", lazy="dynamic")


# ---------------------------------------------------------------------------
# Floors
# ---------------------------------------------------------------------------

class Floor(Base, TimestampMixin):
    __tablename__ = "floors"

    property_id = Column(UUID(as_uuid=True), ForeignKey("properties.id"), nullable=False)
    floor_label = Column(String(100), nullable=False)  # e.g., "Ground Floor", "1st Floor"
    carpet_area_sqft = Column(Float, nullable=True)
    builtup_area_sqft = Column(Float, nullable=True)
    rent_per_sqft = Column(Float, nullable=True)
    availability = Column(SAEnum(PropertyAvailabilityEnum), nullable=True)
    key_facilities = Column(Text, nullable=True)

    property = relationship("Property", back_populates="floors")
    amenities = relationship("FloorAmenity", secondary="floor_amenity_link", lazy="dynamic")


# ---------------------------------------------------------------------------
# Amenities
# ---------------------------------------------------------------------------

class Amenity(Base):
    __tablename__ = "amenities"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), unique=True, nullable=False)
    icon = Column(String(100), nullable=True)


class FloorAmenityLink(Base):
    """Many-to-many: floors ↔ amenities"""
    __tablename__ = "floor_amenity_link"

    floor_id = Column(UUID(as_uuid=True), ForeignKey("floors.id"), primary_key=True)
    amenity_id = Column(Integer, ForeignKey("amenities.id"), primary_key=True)


class FloorAmenity(Base):
    __tablename__ = "floor_amenity_view"
    # This is a view alias; use Amenity for actual ORM operations
    id = Column(Integer, primary_key=True)
    name = Column(String(100))


# ---------------------------------------------------------------------------
# Media
# ---------------------------------------------------------------------------

class PropertyMedia(Base, TimestampMixin):
    __tablename__ = "property_media"

    property_id = Column(UUID(as_uuid=True), ForeignKey("properties.id"), nullable=False)
    file_url = Column(String(1024), nullable=False)
    file_type = Column(String(50), nullable=True)   # "image" | "video" | "document"
    is_main = Column(Boolean, default=False)
    sort_order = Column(Integer, default=0)
    storage_path = Column(String(1024), nullable=True)

    property = relationship("Property", back_populates="media")


# ---------------------------------------------------------------------------
# Compliance Docs
# ---------------------------------------------------------------------------

class ComplianceDoc(Base, TimestampMixin):
    __tablename__ = "compliance_docs"

    property_id = Column(UUID(as_uuid=True), ForeignKey("properties.id"), nullable=False)
    doc_type = Column(String(100), nullable=False)   # "Title Deed", "RERA", etc.
    status = Column(SAEnum(ComplianceStatusEnum), nullable=False, default=ComplianceStatusEnum.pending)
    expected_date = Column(DateTime, nullable=True)
    valid_until = Column(DateTime, nullable=True)
    remarks = Column(Text, nullable=True)
    file_url = Column(String(1024), nullable=True)
    # Aadhaar: only last 4 digits / DigiLocker status — NEVER full number
    aadhaar_last4 = Column(String(4), nullable=True)
    digilocker_status = Column(String(100), nullable=True)

    property = relationship("Property", back_populates="compliance_docs")


# ---------------------------------------------------------------------------
# Contacts (Landlords / Brokers)
# ---------------------------------------------------------------------------

class Contact(Base, TimestampMixin):
    __tablename__ = "contacts"

    property_id = Column(UUID(as_uuid=True), ForeignKey("properties.id"), nullable=False)
    name = Column(String(255), nullable=False)
    role = Column(String(100), nullable=True)  # "Landlord" | "Broker"
    phone = Column(String(20), nullable=True)
    whatsapp = Column(String(20), nullable=True)

    property = relationship("Property", back_populates="contacts")


# ---------------------------------------------------------------------------
# Commercials (extra financial fields)
# ---------------------------------------------------------------------------

class Commercial(Base, TimestampMixin):
    __tablename__ = "commercials"

    property_id = Column(UUID(as_uuid=True), ForeignKey("properties.id"), nullable=False)
    rent_total = Column(Float, nullable=True)
    security_deposit = Column(Float, nullable=True)
    maintenance_charge = Column(Float, nullable=True)
    cam_charges = Column(Float, nullable=True)
    escalation_pct = Column(Float, nullable=True)
    lock_in_period_months = Column(Integer, nullable=True)

    property = relationship("Property", back_populates="commercials")


# ---------------------------------------------------------------------------
# Follow-ups
# ---------------------------------------------------------------------------

class AvailabilityFollowup(Base, TimestampMixin):
    __tablename__ = "availability_followups"

    property_id = Column(UUID(as_uuid=True), ForeignKey("properties.id"), nullable=False)
    assigned_to = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    followup_date = Column(DateTime, nullable=False)
    channel = Column(String(50), nullable=True)   # "whatsapp" | "email" | "phone"
    note = Column(Text, nullable=True)
    is_completed = Column(Boolean, default=False)
    n8n_execution_id = Column(String(255), nullable=True)

    property = relationship("Property", back_populates="followups")


# ---------------------------------------------------------------------------
# Audit Logs
# ---------------------------------------------------------------------------

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    action = Column(SAEnum(AuditActionEnum), nullable=False, index=True)
    resource_type = Column(String(100), nullable=True)   # "property" | "media" | "user" | "system"
    resource_id = Column(String(255), nullable=True)
    details = Column(Text, nullable=True)
    ip_address = Column(String(50), nullable=True)

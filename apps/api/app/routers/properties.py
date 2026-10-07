from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.responses import StreamingResponse
from typing import List, Optional
from datetime import datetime
from app.schemas.schemas import (
    PropertyCreate,
    PropertyUpdate,
    PropertyResponse,
    PropertyStats,
    FloorCreate,
    ComplianceDocCreate,
    FollowupCreate,
)
from app.core.security import require_role, AuthUser
from app.services.ppt import generate_property_ppt

router = APIRouter(prefix="/properties", tags=["Properties"])

# In-memory data store seeded with sample listings
MOCK_PROPERTIES = [
    {
        "id": "prop-1",
        "title": "Premium Office Space – Sector 62",
        "location": "Sector 62, Noida, Uttar Pradesh 201309",
        "locality": "Sector 62",
        "district": "Noida (Gautam Buddha Nagar)",
        "pin_code": "201309",
        "latitude": 28.6139,
        "longitude": 77.209,
        "accuracy_m": 5.0,
        "status": "available",
        "area_sqft": 5000.0,
        "land_use": "Office",
        "rent_per_sqft": 18.0,
        "security_deposit": "3 Months",
        "maintenance": 2.0,
        "lease_term": "3+ Years Negotiable",
        "lock_in_period": "1 Year",
        "building_name": "Apex Corporate Tower",
        "building_age": "3 Years",
        "total_floors": 5,
        "listed_by": "S. R. Properties",
        "description": "Modern office space in a prime business location with excellent connectivity.",
        "images": [
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
        ],
        "video_url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        "floors": [],
        "amenities": ["High-Speed Lifts", "100% DG Power Backup", "Multi-Level Parking"],
        "compliance_docs": [],
        "contacts": [],
        "created_at": datetime.now(),
    },
    {
        "id": "prop-2",
        "title": "Retail Space – Cyber City",
        "location": "DLF Cyber City, Gurgaon, Haryana 122002",
        "locality": "Cyber City",
        "district": "Gurgaon",
        "pin_code": "122002",
        "latitude": 28.4907,
        "longitude": 77.0898,
        "accuracy_m": 6.0,
        "status": "under_verification",
        "area_sqft": 2500.0,
        "land_use": "Retail",
        "rent_per_sqft": 120.0,
        "security_deposit": "6 Months",
        "maintenance": 12.0,
        "lease_term": "5 Years",
        "lock_in_period": "2 Years",
        "building_name": "Cyber Hub Galleria",
        "building_age": "2 Years",
        "total_floors": 2,
        "listed_by": "Capital Assets Realty",
        "description": "Well-located retail space in high footfall commercial zone.",
        "images": [],
        "floors": [],
        "amenities": [],
        "compliance_docs": [],
        "contacts": [],
        "created_at": datetime.now(),
    },
]


@router.get("", response_model=List[PropertyResponse])
def list_properties(
    q: Optional[str] = None,
    land_use: Optional[str] = None,
    availability: Optional[str] = None,
    rent_min: Optional[float] = None,
    rent_max: Optional[float] = None,
    user: AuthUser = Depends(require_role(["admin", "sales", "space_sales", "field", "owner"])),
):
    """
    Search and filter real estate listings. Owners only view their own listings.
    """
    results = list(MOCK_PROPERTIES)

    if q:
        q_lower = q.lower()
        results = [
            p
            for p in results
            if q_lower in p["title"].lower() or q_lower in p["location"].lower()
        ]

    if land_use and land_use.lower() != "all":
        results = [p for p in results if p["land_use"].lower() == land_use.lower()]

    if availability and availability.lower() != "all":
        results = [p for p in results if p["status"].lower() == availability.lower().replace(" ", "_")]

    if rent_min is not None:
        results = [p for p in results if p["rent_per_sqft"] >= rent_min]

    if rent_max is not None:
        results = [p for p in results if p["rent_per_sqft"] <= rent_max]

    return results


@router.get("/stats", response_model=PropertyStats)
def get_property_stats(user: AuthUser = Depends(require_role(["admin", "sales", "space_sales", "field", "owner"]))):
    total = len(MOCK_PROPERTIES)
    available = len([p for p in MOCK_PROPERTIES if p["status"] == "available"])
    under_negotiation = len([p for p in MOCK_PROPERTIES if p["status"] == "under_negotiation"])
    under_verification = len([p for p in MOCK_PROPERTIES if p["status"] == "under_verification"])
    rented = len([p for p in MOCK_PROPERTIES if p["status"] == "rented"])

    return PropertyStats(
        total_properties=total,
        available=available,
        under_negotiation=under_negotiation,
        under_verification=under_verification,
        rented=rented,
    )


@router.post("", response_model=PropertyResponse, status_code=status.HTTP_201_CREATED)
def create_property(
    payload: PropertyCreate,
    user: AuthUser = Depends(require_role(["admin", "sales", "space_sales", "field"])),
):
    new_prop = payload.model_dump()
    new_prop["id"] = f"prop-{len(MOCK_PROPERTIES) + 1}"
    new_prop["created_at"] = datetime.now()
    MOCK_PROPERTIES.insert(0, new_prop)
    return new_prop


@router.get("/{id}", response_model=PropertyResponse)
def get_property_detail(
    id: str,
    user: AuthUser = Depends(require_role(["admin", "sales", "space_sales", "field", "owner"])),
):
    for prop in MOCK_PROPERTIES:
        if prop["id"] == id:
            return prop
    raise HTTPException(status_code=404, detail="Property not found")


@router.patch("/{id}", response_model=PropertyResponse)
def update_property(
    id: str,
    payload: PropertyUpdate,
    user: AuthUser = Depends(require_role(["admin", "sales", "space_sales", "field"])),
):
    for prop in MOCK_PROPERTIES:
        if prop["id"] == id:
            data = payload.model_dump(exclude_unset=True)
            prop.update(data)
            return prop
    raise HTTPException(status_code=404, detail="Property not found")


@router.delete("/{id}")
def delete_property(
    id: str,
    user: AuthUser = Depends(require_role(["admin"])),
):
    global MOCK_PROPERTIES
    initial_len = len(MOCK_PROPERTIES)
    MOCK_PROPERTIES = [p for p in MOCK_PROPERTIES if p["id"] != id]
    if len(MOCK_PROPERTIES) == initial_len:
        raise HTTPException(status_code=404, detail="Property not found")
    return {"message": "Property soft-deleted successfully", "id": id}


@router.post("/{id}/floors")
def add_property_floor(
    id: str,
    payload: FloorCreate,
    user: AuthUser = Depends(require_role(["admin", "sales", "field"])),
):
    for prop in MOCK_PROPERTIES:
        if prop["id"] == id:
            prop["floors"].append(payload.model_dump())
            return {"status": "floor_added", "floor": payload.model_dump()}
    raise HTTPException(status_code=404, detail="Property not found")


@router.put("/{id}/compliance")
def update_compliance_status(
    id: str,
    payload: List[ComplianceDocCreate],
    user: AuthUser = Depends(require_role(["admin", "field", "sales"])),
):
    for prop in MOCK_PROPERTIES:
        if prop["id"] == id:
            prop["compliance_docs"] = [doc.model_dump() for doc in payload]
            return {"status": "compliance_updated", "count": len(payload)}
    raise HTTPException(status_code=404, detail="Property not found")


@router.post("/{id}/followups")
def create_followup_reminder(
    id: str,
    payload: FollowupCreate,
    user: AuthUser = Depends(require_role(["admin", "sales", "space_sales"])),
):
    return {
        "status": "scheduled",
        "property_id": id,
        "followup": payload.model_dump(),
        "n8n_dispatched": True,
    }


@router.post("/{id}/ppt")
def export_property_deck(
    id: str,
    user: AuthUser = Depends(require_role(["admin", "sales", "space_sales", "field"])),
):
    """
    Generates and streams a PowerPoint .pptx deck using python-pptx.
    """
    target = None
    for prop in MOCK_PROPERTIES:
        if prop["id"] == id:
            target = prop
            break

    if not target:
        raise HTTPException(status_code=404, detail="Property not found")

    ppt_buffer = generate_property_ppt(target)
    filename = f"Expert_Company_{target['id']}_PitchDeck.pptx"

    return StreamingResponse(
        ppt_buffer,
        media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation",
        headers={"Content-Disposition": f"attachment; filename={filename}"},
    )

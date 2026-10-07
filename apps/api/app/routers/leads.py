from fastapi import APIRouter, Depends, HTTPException, Query, status
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr
from app.core.security import require_role, AuthUser

router = APIRouter(prefix="/leads", tags=["Leads"])


# ─── Schemas ────────────────────────────────────────────────────────────────

class LeadCreate(BaseModel):
    tenant_name: str
    company: str
    requirement: str
    preferred_locations: List[str] = []
    budget_per_sqft: float
    min_area_sqft: float
    stage: str = "inquiry"
    assigned_agent: str
    phone: str
    email: str
    priority: str = "medium"
    notes: Optional[str] = None
    deal_value_monthly: Optional[float] = None


class LeadUpdate(BaseModel):
    stage: Optional[str] = None
    priority: Optional[str] = None
    assigned_agent: Optional[str] = None
    notes: Optional[str] = None
    budget_per_sqft: Optional[float] = None


class ActivityCreate(BaseModel):
    action: str
    channel: str  # Call | WhatsApp | Email | In-Person
    note: str
    by: str


class LeadResponse(BaseModel):
    id: str
    tenant_name: str
    company: str
    requirement: str
    preferred_locations: List[str]
    budget_per_sqft: float
    min_area_sqft: float
    stage: str
    assigned_agent: str
    phone: str
    email: str
    priority: str
    notes: Optional[str]
    deal_value_monthly: float
    last_contact_date: str
    created_at: str


# ─── Seed Data ──────────────────────────────────────────────────────────────

MOCK_LEADS = [
    {
        "id": "lead-1",
        "tenant_name": "Rajiv Singhania",
        "company": "NexGen Fintech Solutions",
        "requirement": "Fitted 5,000 sq ft Office Space with 100% DG backup & metro proximity",
        "preferred_locations": ["Sector 62, Noida", "Cyber City, Gurgaon"],
        "budget_per_sqft": 20.0,
        "min_area_sqft": 5000.0,
        "stage": "inquiry",
        "assigned_agent": "Neha Verma",
        "phone": "+91 98112 34567",
        "email": "rajiv@nexgenfintech.io",
        "priority": "high",
        "notes": "Requires immediate occupancy by Nov 1. Expanding engineering team from 35 to 80 members.",
        "deal_value_monthly": 100000.0,
        "last_contact_date": "Today, 10:45 AM",
        "created_at": "2026-10-02T10:00:00Z",
        "activities": [
            {
                "id": "act-1",
                "date": "Oct 3, 2026 – 10:45 AM",
                "action": "Follow-up Call",
                "by": "Neha Verma",
                "channel": "Phone",
                "note": "Discussed power backup requirement. Client confirmed 100% DG is mandatory."
            }
        ]
    },
    {
        "id": "lead-2",
        "tenant_name": "Kavita Rao",
        "company": "BlueStone Retail Ventures",
        "requirement": "High-street retail showroom with minimum 40 ft road frontage",
        "preferred_locations": ["Cyber City, Gurgaon", "Connaught Place, New Delhi"],
        "budget_per_sqft": 140.0,
        "min_area_sqft": 2500.0,
        "stage": "site_visit",
        "assigned_agent": "Priya Nair",
        "phone": "+91 99201 88765",
        "email": "kavita.rao@bluestone.com",
        "priority": "high",
        "notes": "Site inspection scheduled at Cyber Hub Galleria for Thursday 3:00 PM.",
        "deal_value_monthly": 350000.0,
        "last_contact_date": "Yesterday, 04:30 PM",
        "created_at": "2026-09-29T14:30:00Z",
        "activities": [
            {
                "id": "act-2",
                "date": "Oct 2, 2026 – 4:30 PM",
                "action": "Site Visit Scheduled",
                "by": "Priya Nair",
                "channel": "WhatsApp",
                "note": "Cyber Hub Galleria 4th floor walkthrough confirmed for Thursday 3PM."
            }
        ]
    },
    {
        "id": "lead-3",
        "tenant_name": "Mahesh Agarwal",
        "company": "Zepto Express Logistics",
        "requirement": "Industrial fulfillment center with 12m clear height & 4+ docking bays",
        "preferred_locations": ["Bhiwandi, Maharashtra", "Dwarka Expressway, Gurgaon"],
        "budget_per_sqft": 10.0,
        "min_area_sqft": 10000.0,
        "stage": "negotiation",
        "assigned_agent": "Rahul Sharma",
        "phone": "+91 97690 12345",
        "email": "mahesh.a@zeptonow.com",
        "priority": "high",
        "notes": "Finalizing 3-year lease draft. Negotiating security deposit from 4 months to 3 months.",
        "deal_value_monthly": 100000.0,
        "last_contact_date": "Oct 1, 2026",
        "created_at": "2026-09-25T11:00:00Z",
        "activities": []
    },
    {
        "id": "lead-4",
        "tenant_name": "Alistair Campbell",
        "company": "Macquarie Advisory India",
        "requirement": "Grade A corporate suite in CBD landmark with high security and LEED certification",
        "preferred_locations": ["Statesman House, Connaught Place", "BKC, Mumbai"],
        "budget_per_sqft": 250.0,
        "min_area_sqft": 3200.0,
        "stage": "negotiation",
        "assigned_agent": "Neha Verma",
        "phone": "+91 98101 99887",
        "email": "a.campbell@macquarie.com",
        "priority": "high",
        "notes": "Sent revised draft for Statesman House 8th Floor. Board approval expected this Friday.",
        "deal_value_monthly": 800000.0,
        "last_contact_date": "Sep 30, 2026",
        "created_at": "2026-09-22T09:00:00Z",
        "activities": []
    },
    {
        "id": "lead-5",
        "tenant_name": "Dr. Arvind Swaminathan",
        "company": "Manipal Diagnostic Labs",
        "requirement": "Commercial ground floor unit with heavy power & bio-waste drainage sanction",
        "preferred_locations": ["Sector 62, Noida", "Okhla, New Delhi"],
        "budget_per_sqft": 25.0,
        "min_area_sqft": 4000.0,
        "stage": "won",
        "assigned_agent": "John Doe",
        "phone": "+91 98450 67890",
        "email": "arvind.s@manipalhospitals.com",
        "priority": "medium",
        "notes": "Agreement signed! 5-year lease registered. Handover completed on Oct 1.",
        "deal_value_monthly": 100000.0,
        "last_contact_date": "Sep 28, 2026",
        "created_at": "2026-09-15T15:00:00Z",
        "activities": []
    },
    {
        "id": "lead-6",
        "tenant_name": "Sanjay Singhal",
        "company": "Decathlon Sports Hub",
        "requirement": "Large-format retail anchor store with parking for 100+ four-wheelers",
        "preferred_locations": ["Dwarka Expressway, Gurgaon"],
        "budget_per_sqft": 50.0,
        "min_area_sqft": 15000.0,
        "stage": "lost",
        "assigned_agent": "Priya Nair",
        "phone": "+91 98119 55443",
        "email": "sanjay.s@decathlon.in",
        "priority": "low",
        "notes": "Chose alternative mall property with direct metro bridge connectivity.",
        "deal_value_monthly": 750000.0,
        "last_contact_date": "Sep 20, 2026",
        "created_at": "2026-09-10T12:00:00Z",
        "activities": []
    },
    {
        "id": "lead-7",
        "tenant_name": "Pooja Batra",
        "company": "Zomato Hyperpure",
        "requirement": "Cold storage & warehousing facility with 3-phase heavy power connection",
        "preferred_locations": ["Bhiwandi", "Okhla Phase 3"],
        "budget_per_sqft": 12.0,
        "min_area_sqft": 8000.0,
        "stage": "site_visit",
        "assigned_agent": "Rahul Sharma",
        "phone": "+91 99100 44321",
        "email": "pooja.batra@zomato.com",
        "priority": "medium",
        "notes": "Site visit confirmed for tomorrow morning with technical facilities team.",
        "deal_value_monthly": 96000.0,
        "last_contact_date": "Today, 02:15 PM",
        "created_at": "2026-10-01T16:00:00Z",
        "activities": []
    },
]

# In-memory store (replace with DB in production)
_leads_store = {lead["id"]: lead for lead in MOCK_LEADS}


# ─── Role helpers ─────────────────────────────────────────────────────────────

ROLES_WITH_LEAD_ACCESS = {"admin", "sales", "space_sales"}


def _check_lead_access(user: AuthUser):
    if user.role not in ROLES_WITH_LEAD_ACCESS:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Role '{user.role}' does not have access to leads. Required: {ROLES_WITH_LEAD_ACCESS}"
        )


# ─── Endpoints ───────────────────────────────────────────────────────────────

@router.get("/", response_model=List[dict])
async def list_leads(
    stage: Optional[str] = Query(None, description="Filter by pipeline stage"),
    priority: Optional[str] = Query(None, description="Filter by priority"),
    assigned_agent: Optional[str] = Query(None, description="Filter by assigned agent"),
    current_user: AuthUser = Depends(require_role(["admin", "sales", "space_sales"]))
):
    """List all leads. Accessible to Admin, Sales, and Space Sales roles only."""
    leads = list(_leads_store.values())

    if stage:
        leads = [l for l in leads if l["stage"] == stage]
    if priority:
        leads = [l for l in leads if l["priority"] == priority]
    if assigned_agent:
        leads = [l for l in leads if assigned_agent.lower() in l["assigned_agent"].lower()]

    # Sales can only see their own leads (unless admin)
    if current_user.role == "sales":
        leads = [l for l in leads if current_user.name and current_user.name in l["assigned_agent"]]

    return leads


@router.get("/stats", response_model=dict)
async def lead_stats(
    current_user: AuthUser = Depends(require_role(["admin", "sales", "space_sales"]))
):
    """Pipeline stats summary."""
    leads = list(_leads_store.values())
    active = [l for l in leads if l["stage"] not in ("won", "lost")]
    won = [l for l in leads if l["stage"] == "won"]
    total_pipeline = sum(l["deal_value_monthly"] for l in leads)

    stage_counts = {}
    for lead in leads:
        stage_counts[lead["stage"]] = stage_counts.get(lead["stage"], 0) + 1

    return {
        "total_leads": len(leads),
        "active_opportunities": len(active),
        "deals_won": len(won),
        "total_monthly_pipeline": total_pipeline,
        "stage_breakdown": stage_counts,
        "avg_deal_value": total_pipeline / len(leads) if leads else 0,
    }


@router.get("/{lead_id}", response_model=dict)
async def get_lead(
    lead_id: str,
    current_user: AuthUser = Depends(require_role(["admin", "sales", "space_sales"]))
):
    """Get a single lead by ID."""
    lead = _leads_store.get(lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail=f"Lead {lead_id} not found")
    return lead


@router.post("/", response_model=dict, status_code=201)
async def create_lead(
    payload: LeadCreate,
    current_user: AuthUser = Depends(require_role(["admin", "sales", "space_sales"]))
):
    """Create a new tenant lead."""
    import uuid
    lead_id = f"lead-{uuid.uuid4().hex[:8]}"
    lead = {
        "id": lead_id,
        "tenant_name": payload.tenant_name,
        "company": payload.company,
        "requirement": payload.requirement,
        "preferred_locations": payload.preferred_locations,
        "budget_per_sqft": payload.budget_per_sqft,
        "min_area_sqft": payload.min_area_sqft,
        "stage": payload.stage,
        "assigned_agent": payload.assigned_agent,
        "phone": payload.phone,
        "email": payload.email,
        "priority": payload.priority,
        "notes": payload.notes,
        "deal_value_monthly": payload.deal_value_monthly or (payload.budget_per_sqft * payload.min_area_sqft),
        "last_contact_date": "Just now",
        "created_at": datetime.utcnow().isoformat() + "Z",
        "activities": [],
        "created_by": current_user.user_id,
    }
    _leads_store[lead_id] = lead
    return lead


@router.patch("/{lead_id}", response_model=dict)
async def update_lead(
    lead_id: str,
    payload: LeadUpdate,
    current_user: AuthUser = Depends(require_role(["admin", "sales", "space_sales"]))
):
    """Update lead stage, priority, or notes."""
    lead = _leads_store.get(lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    update_data = payload.model_dump(exclude_none=True)
    lead.update(update_data)
    lead["last_contact_date"] = datetime.utcnow().strftime("%b %d, %Y")
    _leads_store[lead_id] = lead
    return lead


@router.post("/{lead_id}/activity", response_model=dict, status_code=201)
async def log_activity(
    lead_id: str,
    payload: ActivityCreate,
    current_user: AuthUser = Depends(require_role(["admin", "sales", "space_sales"]))
):
    """Log a CRM activity (call, WhatsApp, email, in-person) for a lead."""
    lead = _leads_store.get(lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    import uuid
    activity = {
        "id": f"act-{uuid.uuid4().hex[:6]}",
        "date": datetime.utcnow().strftime("%b %d, %Y – %I:%M %p"),
        "action": payload.action,
        "channel": payload.channel,
        "note": payload.note,
        "by": payload.by,
    }
    lead.setdefault("activities", []).insert(0, activity)
    lead["last_contact_date"] = activity["date"]
    _leads_store[lead_id] = lead
    return activity


@router.delete("/{lead_id}", status_code=204)
async def delete_lead(
    lead_id: str,
    current_user: AuthUser = Depends(require_role(["admin"]))  # Only admin can hard-delete
):
    """Delete a lead. Admin only."""
    if lead_id not in _leads_store:
        raise HTTPException(status_code=404, detail="Lead not found")
    del _leads_store[lead_id]
    return None

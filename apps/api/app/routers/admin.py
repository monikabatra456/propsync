from fastapi import APIRouter, Depends, HTTPException, Query, Response
from typing import List, Optional
from datetime import datetime
from app.schemas.schemas import AdminStats, ApprovalAction, UserResponse
from app.core.security import require_role, AuthUser

router = APIRouter(prefix="/admin", tags=["Admin"])

# Mock Admin state
MOCK_USERS = [
    {"id": "u-1", "name": "John Doe", "email": "john@expertcompany.com", "role": "admin", "status": "active", "department": "HQ"},
    {"id": "u-2", "name": "Rahul Sharma", "email": "rahul.s@expertcompany.com", "role": "field", "status": "active", "department": "Field"},
    {"id": "u-3", "name": "Priya Nair", "email": "priya.n@expertcompany.com", "role": "sales", "status": "active", "department": "Leasing"},
]

MOCK_APPROVALS = [
    {"id": "app-1", "name": "Vikas Kapoor", "email": "vikas.k@expertcompany.com", "role_requested": "field", "department": "Field Ops"},
    {"id": "app-2", "name": "Tanvi Saxena", "email": "tanvi.s@expertcompany.com", "role_requested": "sales", "department": "Commercial"},
    {"id": "app-3", "name": "Ramanathan Iyer", "email": "raman.i@expertcompany.com", "role_requested": "space_sales", "department": "Retail"},
]

MOCK_AUDIT = [
    {"id": "aud-1", "time": "2025-04-26 14:40:00", "user": "John Doe", "role": "admin", "action": "export", "resource": "Portfolio", "details": "Exported audit CSV", "ip": "192.168.1.45"},
    {"id": "aud-2", "time": "2025-04-26 13:15:00", "user": "Rahul Sharma", "role": "field", "action": "create", "resource": "Property #109", "details": "Created draft listing", "ip": "14.139.60.22"},
]


@router.get("/stats", response_model=AdminStats)
def get_admin_stats(user: AuthUser = Depends(require_role(["admin"]))):
    return AdminStats(
        total_properties=247,
        active_field_agents=16,
        total_users=len(MOCK_USERS),
        storage_usage_gb=12.4,
        storage_limit_gb=100.0,
    )


@router.get("/users")
def get_all_users(user: AuthUser = Depends(require_role(["admin"]))):
    return MOCK_USERS


@router.patch("/users/{id}")
def update_user_status(id: str, status: str = Query(...), user: AuthUser = Depends(require_role(["admin"]))):
    for u in MOCK_USERS:
        if u["id"] == id:
            u["status"] = status
            return {"status": "updated", "user": u}
    raise HTTPException(status_code=404, detail="User not found")


@router.get("/approvals")
def get_signup_approvals(user: AuthUser = Depends(require_role(["admin"]))):
    return {
        "pending_count": len(MOCK_APPROVALS),
        "approvals": MOCK_APPROVALS,
    }


@router.post("/approvals/{id}/{action}")
def decide_approval(
    id: str,
    action: str,
    user: AuthUser = Depends(require_role(["admin"])),
):
    global MOCK_APPROVALS
    target = None
    for a in MOCK_APPROVALS:
        if a["id"] == id:
            target = a
            break

    if not target:
        raise HTTPException(status_code=404, detail="Approval request not found")

    MOCK_APPROVALS = [a for a in MOCK_APPROVALS if a["id"] != id]

    if action.lower() == "approve":
        new_user = {
            "id": f"u-{len(MOCK_USERS) + 1}",
            "name": target["name"],
            "email": target["email"],
            "role": target["role_requested"],
            "status": "active",
            "department": target["department"],
        }
        MOCK_USERS.append(new_user)
        return {"decision": "approved", "user": new_user}

    return {"decision": "rejected", "id": id}


@router.get("/audit")
def get_audit_trail(user: AuthUser = Depends(require_role(["admin"]))):
    return MOCK_AUDIT


@router.get("/audit/export")
def export_audit_csv(user: AuthUser = Depends(require_role(["admin"]))):
    csv_rows = ["Time,User,Role,Action,Resource,Details,IP"]
    for row in MOCK_AUDIT:
        csv_rows.append(f'"{row["time"]}","{row["user"]}","{row["role"]}","{row["action"]}","{row["resource"]}","{row["details"]}","{row["ip"]}"')

    content = "\n".join(csv_rows)
    return Response(
        content=content,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=Expert_Company_Audit_Trail.csv"},
    )

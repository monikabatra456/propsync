import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["app"] == "Expert Company API"


def test_auth_me():
    response = client.get("/api/v1/me", headers={"Authorization": "Bearer admin"})
    assert response.status_code == 200
    data = response.json()
    assert data["role"] == "admin"


def test_role_matrix_permission():
    # Admin can access admin stats
    admin_res = client.get("/api/v1/admin/stats", headers={"Authorization": "Bearer admin"})
    assert admin_res.status_code == 200

    # Field staff cannot access admin stats
    field_res = client.get("/api/v1/admin/stats", headers={"Authorization": "Bearer field"})
    assert field_res.status_code == 403


def test_property_crud_flow():
    # 1. List properties
    list_res = client.get("/api/v1/properties", headers={"Authorization": "Bearer admin"})
    assert list_res.status_code == 200
    properties = list_res.json()
    assert len(properties) >= 1

    # 2. Get property detail
    prop_id = properties[0]["id"]
    detail_res = client.get(f"/api/v1/properties/{prop_id}", headers={"Authorization": "Bearer admin"})
    assert detail_res.status_code == 200
    assert detail_res.json()["id"] == prop_id

    # 3. Create property
    new_prop_payload = {
        "title": "Automated Test Commercial Suite",
        "location": "Sector 142, Noida",
        "locality": "Sector 142",
        "district": "Noida",
        "pin_code": "201305",
        "latitude": 28.502,
        "longitude": 77.412,
        "accuracy_m": 4.0,
        "status": "available",
        "area_sqft": 4000.0,
        "land_use": "Office",
        "rent_per_sqft": 25.0,
        "security_deposit": "3 Months",
        "maintenance": 3.0,
        "lease_term": "3 Years",
        "lock_in_period": "1 Year",
    }
    create_res = client.post("/api/v1/properties", json=new_prop_payload, headers={"Authorization": "Bearer admin"})
    assert create_res.status_code == 201
    created_id = create_res.json()["id"]

    # 4. Soft-delete property (admin only)
    del_res = client.delete(f"/api/v1/properties/{created_id}", headers={"Authorization": "Bearer admin"})
    assert del_res.status_code == 200

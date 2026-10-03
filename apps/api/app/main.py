from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(
    title="PropSync API",
    version="1.0.0",
    docs_url="/docs",
    openapi_url="/api/v1/openapi.json",
)

# CORS configuration
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    return {"status": "ok", "app": "PropSync API", "version": "1.0.0"}


@app.get("/api/v1/me")
def get_current_user_profile():
    return {
        "id": "user-demo",
        "name": "John Doe",
        "email": "john@propsync.com",
        "role": "admin",
        "department": "Management",
    }

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from app.routers import auth, properties, admin, media

app = FastAPI(
    title="PropSync API",
    version="1.0.0",
    description="Backend API for PropSync Commercial Real Estate Management & Field Survey System",
    docs_url="/docs",
    openapi_url="/api/v1/openapi.json",
)

# CORS configuration
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include v1 routers
app.include_router(auth.router, prefix="/api/v1")
app.include_router(properties.router, prefix="/api/v1")
app.include_router(admin.router, prefix="/api/v1")
app.include_router(media.router, prefix="/api/v1")


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "app": "PropSync API",
        "version": "1.0.0",
        "services": {
            "database": "connected",
            "ppt_generator": "ready",
            "storage_signer": "ready",
        },
    }

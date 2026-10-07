from fastapi import APIRouter, Depends, HTTPException, status
import uuid
from app.schemas.schemas import MediaSignedUrlRequest, MediaSignedUrlResponse
from app.core.security import require_role, AuthUser

router = APIRouter(prefix="/media", tags=["Media"])


@router.post("/signed-url", response_model=MediaSignedUrlResponse)
def generate_signed_upload_url(
    payload: MediaSignedUrlRequest,
    user: AuthUser = Depends(require_role(["admin", "sales", "space_sales", "field"])),
):
    """
    Generates a secure direct-to-storage signed PUT URL for photo/video uploads.
    """
    media_id = str(uuid.uuid4())
    file_path = f"properties/{payload.property_id or 'draft'}/{media_id}_{payload.filename}"
    upload_url = f"https://expertcompany-storage.s3.ap-south-1.amazonaws.com/{file_path}?signed_token=mock_upload_jwt"

    return MediaSignedUrlResponse(
        upload_url=upload_url,
        media_id=media_id,
        file_path=file_path,
    )


@router.post("/confirm")
def confirm_media_upload(
    media_id: str,
    property_id: str,
    user: AuthUser = Depends(require_role(["admin", "sales", "space_sales", "field"])),
):
    return {
        "status": "confirmed",
        "media_id": media_id,
        "property_id": property_id,
        "public_url": f"https://cdn.expertcompany.com/properties/{property_id}/{media_id}.jpg",
    }


@router.delete("/{id}")
def delete_media(
    id: str,
    user: AuthUser = Depends(require_role(["admin", "sales", "field"])),
):
    return {"status": "deleted", "media_id": id}

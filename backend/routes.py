from fastapi import APIRouter, Depends, HTTPException, File, Request, UploadFile
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from . import models, controller, db
import pdfplumber
from jose import jwt
from datetime import datetime, timedelta
import os

router = APIRouter()

# Sign-up endpoint
@router.post("/signup/")
async def signup(request: Request, db: Session = Depends(db.get_db)):
    data = await request.json()
    email = data.get("email")
    firstName = data.get("firstName")
    lastName = data.get("lastName")
    password = data.get("password")

    existingUser = controller.getUserByEmail(db, email)
    if existingUser:
        raise HTTPException(status_code=400, detail="Email is already registered")
    
    return controller.createUser(db=db, email=email, firstName=firstName, lastName=lastName, password=password)

# Sign-in endpoint
@router.post("/signin/")
async def signin(request: Request, db: Session = Depends(db.get_db)):
    data = await request.json()
    email = data.get("email")
    password = data.get("password")
    user = controller.getUserByEmail(db, email)
        
    if user is None or not controller.verify_password(password, user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    # Create JWT token
    token = create_jwt_token({"sub": user.email})
    
    # Create response with token
    response = JSONResponse(content={"message": "Login successful!", "token": token})
    
    # Set cookie
    response.set_cookie(
        key="access_token", 
        value=token, 
        httponly=True, 
        max_age=3600,
        samesite="lax",
        secure=False  # Set to True if using HTTPS
    )
    
    return response

@router.put("/profile/update/{email}")
def update_profile(
    email: str,
    display_name: str = None,
    avatar_url: str = None,
    current_position: str = None,
    location: str = None,
    bio: str = None,
    github_username: str = None,
    linkedin_username: str = None,
    website: str = None,
    db: Session = Depends(db.get_db)
):
    # Fetch user by email
    user = controller.getUserByEmail(db, email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Fetch the user's profile
    profile = controller.getProfileByUserId(db, user.id)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    # Update profile details
    updated_profile = controller.updateProfile(
        db=db,
        profile=profile,
        display_name=display_name,
        avatar_url=avatar_url,
        current_position=current_position,
        location=location,
        bio=bio,
        github_username=github_username,
        linkedin_username=linkedin_username,
        website=website
    )

    return updated_profile

# Endpoint to get user details by email
@router.get("/users/{email}")
def get_user(email: str, db: Session = Depends(db.get_db)):
    user = controller.getUserByEmail(db, email)

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Extract text from PDF endpoint
@router.post("/extract_text/")
async def extract_text_from_pdf(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file format. Please upload a PDF file.")
    
    try:
        with pdfplumber.open(file.file) as pdf:
            text = ""
            for page in pdf.pages:
                text += page.extract_text()
        
        return {"extracted_text": text}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to extract text from the PDF: {e}")

# Helper function to create JWT token
def create_jwt_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=60)  # Token expires in 60 minutes
    to_encode.update({"exp": expire})
    secret_key = os.environ.get("SECRET_KEY")  # Use environment variable for secret key
    return jwt.encode(to_encode, secret_key, algorithm="HS256")

@router.post("/test")
async def test(request: Request):
    data = await request.json()
    print(data)
    return {"message": "Hello World"}

from fastapi import APIRouter, Depends, HTTPException, File, Request, UploadFile
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from . import models, controller, db
import pdfplumber
from jose import jwt
from datetime import datetime, timedelta
import os
import io

router = APIRouter()


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="signin")

# Sign-up endpoint
@router.post("/signup/")
async def signup(request: Request, db: Session = Depends(db.get_db)):
    data = await request.json()
    email = data.get("email")
    firstName = data.get("firstName")
    lastName = data.get("lastName")
    password = data.get("password")

    # Check if the user already exists
    existingUser = controller.getUserByEmail(db, email)
    if existingUser:
        raise HTTPException(status_code=400, detail="Email is already registered")

    # Create the user
    user = controller.createUser(db=db, email=email, firstName=firstName, lastName=lastName, password=password)
    
    # After user is created, create a blank profile for the user
    profile = controller.createProfile(db=db, user_id=user.id)
    
    return {"message": "User created successfully", "user": user, "profile": profile}

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

#Endpoint to retrieve users info
@router.get("/profile/")
async def get_profile(token: str = Depends(oauth2_scheme), db: Session = Depends(db.get_db)):
    # Get the user by token
    user = controller.getUserByToken(db, token)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    profile = controller.getProfileByUserId(db, user.id)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    return profile

#Endpoint to upload users profile info
@router.put("/profile/update/")
def update_profile(
    display_name: str = None,
    avatar_url: str = None,
    current_position: str = None,
    location: str = None,
    bio: str = None,
    github_username: str = None,
    linkedin_username: str = None,
    website: str = None,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(db.get_db)
):
    # Get the user by token
    user = controller.getUserByToken(db, token)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    profile = controller.getProfileByUserId(db, user.id)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
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
        pdf_content = await file.read()
        pdf_file = io.BytesIO(pdf_content)
        
        text = ""
        
        with pdfplumber.open(pdf_file) as pdf:
            for page in pdf.pages:
                text += page.extract_text() or ""
                
                # Extract hyperlinks
                for annotation in page.hyperlinks:
                    if 'uri' in annotation:
                        # Append the hyperlinks to the beginning of the text
                        text = f"{annotation['uri']}\n{text}"
        
        return {"extracted_text": text}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to extract content from the PDF: {e}")

# Helper function to create JWT token
def create_jwt_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=60)  # Token expires in 60 minutes
    to_encode.update({"exp": expire})
    secret_key = os.environ.get("SECRET_KEY")
    return jwt.encode(to_encode, secret_key, algorithm="HS256")

@router.post("/test")
async def test(request: Request):
    data = await request.json()
    print(data)
    return {"message": "Hello World"}

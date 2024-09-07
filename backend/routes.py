from fastapi import APIRouter, Depends, HTTPException, File, Request, UploadFile
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from . import models, controller, db
import pdfplumber
from jose import jwt
from datetime import datetime, timedelta
import os
import io

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

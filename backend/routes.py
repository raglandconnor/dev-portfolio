from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from sqlalchemy.orm import Session
from . import models, controller, db
import pdfplumber

router = APIRouter()

@router.post("/users/")
def create_user(email: str, firstName: str, lastName: str, db: Session = Depends(db.get_db)):
    existingUser = controller.getUserByEmail(db, email)
    if existingUser:
        raise HTTPException(status_code=400, detail="Email is already registered")
    return controller.createUser(db=db, email=email, firstName=firstName, lastName=lastName)

@router.get("/users/{email}")
def get_user(email: str, db: Session = Depends(db.get_db)):
    user = controller.getUserByEmail(db, email)

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

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
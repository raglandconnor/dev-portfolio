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

oauth2Scheme = OAuth2PasswordBearer(tokenUrl="signin")

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
    profile = controller.createProfile(db=db, userId=user.id)
    
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
    token = createJwtToken({"sub": user.email})
    
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

# Endpoint to retrieve users info
@router.get("/profile/")
async def getProfile(token: str = Depends(oauth2Scheme), db: Session = Depends(db.get_db)):
    # Get the user by token
    user = controller.getUserByToken(db, token)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    profile = controller.getProfileByUserId(db, user.id)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    return profile
    
@router.put("/profile/update/")
def updateProfile(
    displayName: str = None,
    avatarUrl: str = None,
    currentPosition: str = None,
    location: str = None,
    bio: str = None,
    githubUsername: str = None,
    linkedinUsername: str = None,
    website: str = None,
    token: str = Depends(oauth2Scheme),
    db: Session = Depends(db.get_db)
):
    # Get the user by token
    user = controller.getUserByToken(db, token)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Call updateProfile with the user ID and profile data
    updatedProfile = controller.updateProfile(
        db=db,
        user_id=user.id,
        displayName=displayName,
        avatarUrl=avatarUrl,
        currentPosition=currentPosition,
        location=location,
        bio=bio,
        githubUsername=githubUsername,
        linkedinUsername=linkedinUsername,
        website=website
    )
    
    return updatedProfile
 
#Experinece Routes

# Create a new experience record
@router.post("/experience/")
def createExperience(
    title: str,
    company: str,
    startDate: str,
    endDate: str,
    location: str,
    description: str,
    token: str = Depends(oauth2Scheme),
    db: Session = Depends(db.get_db)
):
    user = controller.getUserByToken(db, token)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    profile = controller.getProfileByUserId(db, user.id)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    experience = controller.createExperience(
        db=db,
        profileId=profile.id,
        title=title,
        company=company,
        startDate=startDate,
        endDate=endDate,
        location=location,
        description=description
    )
    
    return experience

# Get an experience record by ID
@router.get("/experience/{id}/")
def getExperience(id: str, db: Session = Depends(db.get_db)):
    experience = controller.getExperienceById(db, id)
    if not experience:
        raise HTTPException(status_code=404, detail="Experience not found")
    return experience

# Update an experience record by ID
@router.put("/experience/{id}/")
def updateExperience(
    id: str,
    title: str = None,
    company: str = None,
    startDate: str = None,
    endDate: str = None,
    location: str = None,
    description: str = None,
    token: str = Depends(oauth2Scheme),
    db: Session = Depends(db.get_db)
):
    user = controller.getUserByToken(db, token)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    experience = controller.getExperienceById(db, id)
    if not experience:
        raise HTTPException(status_code=404, detail="Experience not found")
    
    updatedExperience = controller.updateExperience(
        db=db,
        experience=experience,
        title=title,
        company=company,
        startDate=startDate,
        endDate=endDate,
        location=location,
        description=description
    )
    
    return updatedExperience

# Delete an experience record by ID
@router.delete("/experience/{id}/")
def deleteExperience(id: str, db: Session = Depends(db.get_db)):
    experience = controller.getExperienceById(db, id)
    if not experience:
        raise HTTPException(status_code=404, detail="Experience not found")
    
    controller.deleteExperience(db, id)
    
    return {"message": "Experience deleted successfully"}

#Education Routes

# Create a new education record
@router.post("/education/")
def createEducation(
    school: str,
    degree: str,
    fieldOfStudy: str,
    startDate: str,
    endDate: str,
    location: str,
    token: str = Depends(oauth2Scheme),
    db: Session = Depends(db.get_db)
):
    user = controller.getUserByToken(db, token)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    profile = controller.getProfileByUserId(db, user.id)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    education = controller.createEducation(
        db=db,
        profileId=profile.id,
        school=school,
        degree=degree,
        fieldOfStudy=fieldOfStudy,
        startDate=startDate,
        endDate=endDate,
        location=location
    )
    
    return education

# Get an education record by ID
@router.get("/education/{id}/")
def getEducation(id: str, db: Session = Depends(db.get_db)):
    education = controller.getEducationById(db, id)
    if not education:
        raise HTTPException(status_code=404, detail="Education not found")
    return education

# Update an education record by ID
@router.put("/education/{id}/")
def updateEducation(
    id: str,
    school: str = None,
    degree: str = None,
    fieldOfStudy: str = None,
    startDate: str = None,
    endDate: str = None,
    location: str = None,
    token: str = Depends(oauth2Scheme),
    db: Session = Depends(db.get_db)
):
    user = controller.getUserByToken(db, token)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    education = controller.getEducationById(db, id)
    if not education:
        raise HTTPException(status_code=404, detail="Education not found")
    
    updatedEducation = controller.updateEducation(
        db=db,
        education=education,
        school=school,
        degree=degree,
        fieldOfStudy=fieldOfStudy,
        startDate=startDate,
        endDate=endDate,
        location=location
    )
    
    return updatedEducation

# Delete an education record by ID
@router.delete("/education/{id}/")
def deleteEducation(id: str, db: Session = Depends(db.get_db)):
    education = controller.getEducationById(db, id)
    if not education:
        raise HTTPException(status_code=404, detail="Education not found")
    
    controller.deleteEducation(db, id)
    
    return {"message": "Education deleted successfully"}

# Create a new project record
@router.post("/projects/")
def createProject(
    title: str,
    description: str,
    startDate: str,
    endDate: str,
    technologies: str,  # Consider using JSON or comma-separated values
    links: str,  # Consider using JSON
    token: str = Depends(oauth2Scheme),
    db: Session = Depends(db.get_db)
):
    user = controller.getUserByToken(db, token)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    profile = controller.getProfileByUserId(db, user.id)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    project = controller.createProject(
        db=db,
        profileId=profile.id,
        title=title,
        description=description,
        startDate=startDate,
        endDate=endDate,
        technologies=technologies,
        links=links
    )
    
    return project

#Project Routes

# Get a project record by ID
@router.get("/projects/{id}/")
def getProject(id: str, db: Session = Depends(db.get_db)):
    project = controller.getProjectById(db, id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

# Update a project record by ID
@router.put("/projects/{id}/")
def updateProject(
    id: str,
    title: str = None,
    description: str = None,
    startDate: str = None,
    endDate: str = None,
    technologies: str = None,  # Consider using JSON or comma-separated values
    links: str = None,  # Consider using JSON
    token: str = Depends(oauth2Scheme),
    db: Session = Depends(db.get_db)
):
    user = controller.getUserByToken(db, token)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    project = controller.getProjectById(db, id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    updatedProject = controller.updateProject(
        db=db,
        project=project,
        title=title,
        description=description,
        startDate=startDate,
        endDate=endDate,
        technologies=technologies,
        links=links
    )
    
    return updatedProject

# Delete a project record by ID
@router.delete("/projects/{id}/")
def deleteProject(id: str, db: Session = Depends(db.get_db)):
    project = controller.getProjectById(db, id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    controller.deleteProject(db, id)
    
    return {"message": "Project deleted successfully"}


# Endpoint to get user details by email
@router.get("/users/{email}")
def getUser(email: str, db: Session = Depends(db.get_db)):
    user = controller.getUserByEmail(db, email)

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Extract text from PDF endpoint
@router.post("/extractText/")
async def extractTextFromPdf(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file format. Please upload a PDF file.")
    
    try:
        pdfContent = await file.read()
        pdfFile = io.BytesIO(pdfContent)
        
        text = ""
        
        with pdfplumber.open(pdfFile) as pdf:
            for page in pdf.pages:
                text += page.extract_text() or ""
                
                # Extract hyperlinks
                for annotation in page.hyperlinks:
                    if 'uri' in annotation:
                        # Append the hyperlinks to the beginning of the text
                        text = f"{annotation['uri']}\n{text}"
        
        return {"extractedText": text}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to extract content from the PDF: {e}")

@router.post("/test")
async def test(request: Request):
    data = await request.json()
    print(data)
    return {"message": "Hello World"}

# Helper function to create JWT token
def createJwtToken(data: dict):
    toEncode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=60)  # Token expires in 60 minutes
    toEncode.update({"exp": expire})
    secretKey = os.environ.get("SECRET_KEY")
    return jwt.encode(toEncode, secretKey, algorithm="HS256")

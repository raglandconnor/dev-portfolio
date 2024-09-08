from sqlalchemy.orm import Session
from . import models
import uuid
from passlib.context import CryptContext
from jose import jwt, JWTError
from fastapi import Depends, HTTPException
from .config import SECRET_KEY, ALGORITHM

# Create a password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def createUser(db: Session, email: str, firstName: str, lastName: str, password: str):
    if db.query(models.User).filter(models.User.email == email).first():
        raise HTTPException(status_code=400, detail="Email is already registered")
    
    hashed_password = hash_password(password)
    dbUser = models.User(
        id=str(uuid.uuid4()), 
        email=email, 
        firstName=firstName, 
        lastName=lastName, 
        password=hashed_password
    )
    db.add(dbUser)
    db.commit()
    db.refresh(dbUser)
    return dbUser

def getUserByEmail(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def createProfile(db: Session, user_id: int, **profile_data):
    profile = models.Profile(user_id=user_id, **profile_data)
    db.add(profile)
    db.commit()
    db.refresh(profile)
    return profile

def getProfileByUserId(db: Session, user_id: int):
    profile = db.query(models.Profile).filter(models.Profile.user_id == user_id).first()
    if profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

def updateProfile(db: Session, user_id: int, **profile_data):
    profile = db.query(models.Profile).filter(models.Profile.user_id == user_id).first()
    if profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    for key, value in profile_data.items():
        setattr(profile, key, value)
    
    db.commit()
    db.refresh(profile)
    return profile

def createExperience(db: Session, profile_id: int, **experience_data):
    experience = models.Experience(profile_id=profile_id, **experience_data)
    db.add(experience)
    db.commit()
    db.refresh(experience)
    return experience

def createEducation(db: Session, profile_id: int, **education_data):
    education = models.Education(profile_id=profile_id, **education_data)
    db.add(education)
    db.commit()
    db.refresh(education)
    return education

def createProject(db: Session, profile_id: int, **project_data):
    project = models.Project(profile_id=profile_id, **project_data)
    db.add(project)
    db.commit()
    db.refresh(project)
    return project

def updateExperience(db: Session, experience_id: int, **experience_data):
    experience = db.query(models.Experience).filter(models.Experience.id == experience_id).first()
    if experience is None:
        raise HTTPException(status_code=404, detail="Experience not found")
    
    for key, value in experience_data.items():
        setattr(experience, key, value)
    
    db.commit()
    db.refresh(experience)
    return experience

def updateEducation(db: Session, education_id: int, **education_data):
    education = db.query(models.Education).filter(models.Education.id == education_id).first()
    if education is None:
        raise HTTPException(status_code=404, detail="Education not found")
    
    for key, value in education_data.items():
        setattr(education, key, value)
    
    db.commit()
    db.refresh(education)
    return education

def updateProject(db: Session, project_id: int, **project_data):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    
    for key, value in project_data.items():
        setattr(project, key, value)
    
    db.commit()
    db.refresh(project)
    return project

def getUserByToken(db: Session, token: str):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        # Decode the JWT token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        
        if email is None:
            raise credentials_exception
        
    except JWTError:
        raise credentials_exception
    
    # Fetch the user from the database by email
    user = db.query(models.User).filter(models.User.email == email).first()
    
    if user is None:
        raise credentials_exception
    
    return user

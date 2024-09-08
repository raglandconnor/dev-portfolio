from sqlalchemy.orm import Session
from . import models
import uuid
from passlib.hash import bcrypt
from jose import jwt, JWTError
from fastapi import HTTPException
from .config import SECRET_KEY, ALGORITHM

def hash_password(password: str) -> str:
    return bcrypt.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.verify(plain_password, hashed_password)

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

def createProfile(db: Session, userId: str, **profile_data):
    profile = models.Profile(userId=userId, **profile_data)
    db.add(profile)
    db.commit()
    db.refresh(profile)
    return profile

def getProfileByUserId(db: Session, userId: str):
    profile = db.query(models.Profile).filter(models.Profile.userId == userId).first()
    if profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

def updateProfile(db: Session, user_id: str, **profile_data):
    profile = db.query(models.Profile).filter(models.Profile.userId == user_id).first()
    if profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    for key, value in profile_data.items():
        setattr(profile, key, value)
    
    db.commit()
    db.refresh(profile)
    return profile


def createExperience(db: Session, profileId: str, **experience_data):
    experience = models.Experience(profileId=profileId, **experience_data)
    db.add(experience)
    db.commit()
    db.refresh(experience)
    return experience

def createEducation(db: Session, profileId: str, **education_data):
    education = models.Education(profileId=profileId, **education_data)
    db.add(education)
    db.commit()
    db.refresh(education)
    return education

def createProject(db: Session, profileId: str, **project_data):
    project = models.Project(profileId=profileId, **project_data)
    db.add(project)
    db.commit()
    db.refresh(project)
    return project

def updateExperience(db: Session, experienceId: str, **experience_data):
    experience = db.query(models.Experience).filter(models.Experience.id == experienceId).first()
    if experience is None:
        raise HTTPException(status_code=404, detail="Experience not found")
    
    for key, value in experience_data.items():
        setattr(experience, key, value)
    
    db.commit()
    db.refresh(experience)
    return experience

def updateEducation(db: Session, educationId: str, **education_data):
    education = db.query(models.Education).filter(models.Education.id == educationId).first()
    if education is None:
        raise HTTPException(status_code=404, detail="Education not found")
    
    for key, value in education_data.items():
        setattr(education, key, value)
    
    db.commit()
    db.refresh(education)
    return education

def updateProject(db: Session, projectId: str, **project_data):
    project = db.query(models.Project).filter(models.Project.id == projectId).first()
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

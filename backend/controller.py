from sqlalchemy.orm import Session
from . import models
from .models import Profile
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

def createProfile(db: Session, user_id: int, display_name: str = None, avatar_url: str = None, current_position: str = None, location: str = None, bio: str = None, github_username: str = None, linkedin_username: str = None, website: str = None):
    profile = Profile(
        user_id=user_id,
        display_name=display_name,
        avatar_url=avatar_url,
        current_position=current_position,
        location=location,
        bio=bio,
        github_username=github_username,
        linkedin_username=linkedin_username,
        website=website
    )
    db.add(profile)
    db.commit()
    db.refresh(profile)
    return profile

def getProfileByUserId(db: Session, user_id: str):

    return db.query(Profile).filter(Profile.user_id == user_id).first()

def updateProfile(db: Session, profile: Profile, display_name: str = None, avatar_url: str = None,
                  current_position: str = None, location: str = None, bio: str = None,
                  github_username: str = None, linkedin_username: str = None, website: str = None):

    if display_name is not None:
        profile.display_name = display_name
    if avatar_url is not None:
        profile.avatar_url = avatar_url
    if current_position is not None:
        profile.current_position = current_position
    if location is not None:
        profile.location = location
    if bio is not None:
        profile.bio = bio
    if github_username is not None:
        profile.github_username = github_username
    if linkedin_username is not None:
        profile.linkedin_username = linkedin_username
    if website is not None:
        profile.website = website

    db.commit()
    db.refresh(profile)
    return profile

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

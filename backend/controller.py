from sqlalchemy.orm import Session
from . import models
import uuid
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def createUser(db: Session, email: str, firstName: str, lastName: str, password: str):
    hashed_password = hash_password(password)
    dbUser = models.User(id=str(uuid.uuid4()), email=email, firstName=firstName, lastName=lastName, password=hashed_password)
    db.add(dbUser)
    db.commit()
    db.refresh(dbUser)
    return dbUser

def getUserByEmail(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

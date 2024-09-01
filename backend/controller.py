from sqlalchemy.orm import Session
from . import models
import uuid

def createUser(db: Session, email: str, firstName: str, lastName: str):
    dbUser = models.User(id=str(uuid.uuid4()), email=email, firstName=firstName, lastName=lastName)
    db.add(dbUser)
    db.commit()
    db.refresh(dbUser)
    return dbUser


def getUserByEmail(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


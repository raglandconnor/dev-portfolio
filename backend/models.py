from sqlalchemy import Column, String
from sqlalchemy.ext.declarative import declarative_base
import uuid
from passlib.hash import bcrypt

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, nullable=False)
    firstName = Column(String, nullable=False)
    lastName = Column(String, nullable=False)
    password = Column(String, nullable=False)

    def set_password(self, password: str):
        self.hashed_password = bcrypt.hash(password)

    def verify_password(self, password: str) -> bool:
        return bcrypt.verify(password, self.hashed_password)

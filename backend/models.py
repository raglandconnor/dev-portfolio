from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
import uuid

Base = declarative_base()

class User(Base):

    __tablename__ = 'users'

    id = Column(String, primary_key=True, default=lambda: srt(uuid.uuid4))
    email = Column(String, unique=True, nullable=False)
    firstName = Column(String, nullable=False)
    lastName = Column(String, nullable=False)

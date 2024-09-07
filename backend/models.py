from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
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

    profile = relationship("Profile", back_populates="user", uselist=False)

    def set_password(self, password: str):
        self.password = bcrypt.hash(password)

    def verify_password(self, password: str) -> bool:
        return bcrypt.verify(password, self.password)


class Profile(Base):
    __tablename__ = 'profiles'

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey('users.id'), nullable=False)

    # Profile fields
    display_name = Column(String)
    avatar_url = Column(String)
    current_position = Column(String)
    location = Column(String)
    bio = Column(String)
    github_username = Column(String)
    linkedin_username = Column(String)
    website = Column(String)

    user = relationship("User", back_populates="profile")

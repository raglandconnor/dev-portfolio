from sqlalchemy import Column, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
import uuid
from passlib.hash import bcrypt

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    email = Column(String, unique=True, index=True)
    firstName = Column(String)
    lastName = Column(String)
    password = Column(String)

    profile = relationship("Profile", uselist=False, back_populates="user")

    @staticmethod
    def hash_password(password: str) -> str:
        return bcrypt.hash(password)

    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        return bcrypt.verify(plain_password, hashed_password)

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    userId = Column(String, ForeignKey("users.id"))
    displayName = Column(String, index=True)
    avatarUrl = Column(String)
    currentPosition = Column(String)
    location = Column(String)
    bio = Column(Text)
    githubUsername = Column(String)
    linkedinUsername = Column(String)
    website = Column(String)

    user = relationship("User", back_populates="profile")
    experience = relationship("Experience", back_populates="profile")
    education = relationship("Education", back_populates="profile")
    projects = relationship("Project", back_populates="profile")

class Experience(Base):
    __tablename__ = "experiences"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    profileId = Column(String, ForeignKey("profiles.id"))
    title = Column(String)
    company = Column(String)
    startDate = Column(String)
    endDate = Column(String)
    location = Column(String)
    description = Column(Text)

    profile = relationship("Profile", back_populates="experience")

class Education(Base):
    __tablename__ = "education"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    profileId = Column(String, ForeignKey("profiles.id"))
    school = Column(String)
    degree = Column(String)
    fieldOfStudy = Column(String)
    startDate = Column(String)
    endDate = Column(String)
    location = Column(String)

    profile = relationship("Profile", back_populates="education")

class Project(Base):
    __tablename__ = "projects"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    profileId = Column(String, ForeignKey("profiles.id"))
    title = Column(String)
    description = Column(Text)
    startDate = Column(String)
    endDate = Column(String)
    technologies = Column(Text)  # Store as comma-separated values or JSON
    links = Column(Text)  # Store as JSON string

    profile = relationship("Profile", back_populates="projects")

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
    userId = Column(String, ForeignKey('users.id'), nullable=False)

    # Profile fields
    displayName = Column(String)
    avatarUrl = Column(String)
    currentPosition = Column(String)
    location = Column(String)
    bio = Column(String)
    githubUsername = Column(String)
    linkedinUsername = Column(String)
    website = Column(String)

    user = relationship("User", back_populates="profile")

class Experience(Base):
    __tablename__ = 'experiences'

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    userId = Column(String, ForeignKey('users.id'), nullable=False)
    title = Column(String)
    company = Column(String)
    startDate = Column(String)
    endDate = Column(String)
    location = Column(String)
    description = Column(String)

    user = relationship("User", back_populates="experiences")

class Education(Base):
    __tablename__ = 'educations'

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    userId = Column(String, ForeignKey('users.id'), nullable=False)
    school = Column(String)
    degree = Column(String)
    fieldOfStudy = Column(String)
    startDate = Column(String)
    endDate = Column(String)
    location = Column(String)
    description = Column(String)

    user = relationship("User", back_populates="educations")

class Project(Base):
    __tablename__ = 'projects'

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    userId = Column(String, ForeignKey('users.id'), nullable=False)
    title = Column(String)
    description = Column(String)
    technologies = Column(String)  # Store as JSON string
    startDate = Column(String)
    endDate = Column(String)
    links = Column(String)  # Store as JSON string

    user = relationship("User", back_populates="projects")

User.experiences = relationship("Experience", order_by=Experience.id, back_populates="user")
User.educations = relationship("Education", order_by=Education.id, back_populates="user")
User.projects = relationship("Project", order_by=Project.id, back_populates="user")

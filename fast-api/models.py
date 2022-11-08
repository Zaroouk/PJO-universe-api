from sqlalchemy import Boolean, Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from db import Base


class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

    personas = relationship('Personas', back_populates='owner')


class Personas(Base):
    __tablename__ = 'personas'

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    birth_date = Column(String)
    weapon = Column(String)
    godly_parent = Column(String)
    mortal_parent = Column(String)
    camp = Column(String)
    species = Column(String)
    owner_id = Column(Integer, ForeignKey('users.id'))

    owner = relationship('Users', back_populates='personas')
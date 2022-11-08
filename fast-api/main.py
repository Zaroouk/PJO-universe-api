from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
import models
from db import engine, SessionLocal
from sqlalchemy.orm import Session
from auth import get_current_user, get_user_exception
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


models.Base.metadata.create_all(bind=engine)


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


class Personas(BaseModel):
    first_name: str
    last_name: str
    birth_date: str
    weapon: str
    godly_parent: str
    mortal_parent: str
    camp: str
    species: str


@app.get("/")
async def read_all(db: Session = Depends(get_db)):
    return db.query(models.Personas).all()

@app.get('/personas/user')
async def read_all_by_user(user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    if user is None:
        raise get_user_exception()
    return db.query(models.Personas)\
        .filter(models.Personas.owner_id == user.get('id'))\
        .all()


@app.get("/personas/{persona_id}")
async def read_persona(persona_id:int,
db: Session = Depends(get_db)):

    persona_model = db.query(models.Personas).filter(models.Personas.id == persona_id).first()

    if persona_model is not None:
        return persona_model
    raise http_exception()

@app.post('/')
async def create_personas(
                        persona: Personas,
                        user: dict = Depends(get_current_user),
                        db: Session = Depends(get_db)
                        ):
    if user is None:
        raise get_user_exception()
    persona_model = models.Personas()
    persona_model.first_name = persona.first_name
    persona_model.last_name = persona.last_name
    persona_model.birth_date = persona.birth_date
    persona_model.camp = persona.camp
    persona_model.godly_parent = persona.godly_parent
    persona_model.mortal_parent = persona.mortal_parent
    persona_model.weapon = persona.weapon
    persona_model.species = persona.species
    # persona_model.owner_id = user.get('id')

    print(persona_model)

    db.add(persona_model)
    db.commit()

    return successful_response(201)

@app.put('/{persona_id}')
async def update_persona(persona_id: int, persona: Personas, user:dict = Depends(get_current_user), db: Session = Depends(get_db)):
    if user is None:
        raise get_user_exception()

    persona_model = db.query(models.Personas)\
        .filter(models.Personas.id == persona_id)\
        .first()
    if persona_model is None:
        raise http_exception()

    persona_model.first_name = persona.first_name
    persona_model.last_name = persona.last_name
    persona_model.birth_date = persona.birth_date
    persona_model.camp = persona.camp
    persona_model.godly_parent = persona.godly_parent
    persona_model.mortal_parent = persona.mortal_parent
    persona_model.weapon = persona.weapon
    persona_model.species = persona.species

    db.add(persona_model)
    db.commit()

    return successful_response(200)

@app.delete('/{persona_id}')
async def delete_persona(persona_id: int, db: Session = Depends(get_db)):
    persona_model = db.query(models.Personas)\
        .filter(models.Personas.id == persona_id)\
        .first()

    if persona_model is None:
        raise http_exception()

    db.query(models.Personas)\
        .filter(models.personas.id == persona_id)\
        .delete()

    db.commit()

    return successful_response(200)



def http_exception():
    return HTTPException(status_code=404, detail='Persona Not Found')

def successful_response(status_code:int):
    return {
        'status': status_code,
        'transaction':'Succesful'
    }

# origins = [
#     'http://localhost:5173'
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins = origins,
#     allow_credentials = True,
#     allow_methods = ["*"],
#     allow_headers = ['*'],
# )
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from . import models, schemas
from .database import SessionLocal

router = APIRouter()

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def home():
    return {"message": "Taskify API is running 🚀"}


@router.post("/notes")
def create_note(note: schemas.NoteCreate, db: Session = Depends(get_db)):
    new_note = models.Note(title=note.title, content=note.content)
    db.add(new_note)
    db.commit()
    db.refresh(new_note)
    return new_note


@router.get("/notes")
def get_notes(db: Session = Depends(get_db)):
    return db.query(models.Note).all()
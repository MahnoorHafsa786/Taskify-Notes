from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NotesRequest(BaseModel):
    notes: str


@app.get("/")
def home():
    return {"message": "Taskify Backend Running"}


@app.post("/extract-tasks")
def extract_tasks(data: NotesRequest):

    notes = data.notes

    # simple working logic
    tasks = [t.strip() for t in notes.split(".") if t.strip()]

    return {
        "tasks": tasks
    }
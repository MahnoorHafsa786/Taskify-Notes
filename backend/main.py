from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class NotesRequest(BaseModel):
    notes: str

# Home route
@app.get("/")
def home():
    return {"message": "Taskify Backend Running"}

# Extract tasks route
@app.post("/extract-tasks")
def extract_tasks(data: NotesRequest):

    notes = data.notes

    lines = notes.split(".")

    tasks = []

    for line in lines:
        line = line.strip()

        if line:
            tasks.append(line)

    return {"tasks": tasks}
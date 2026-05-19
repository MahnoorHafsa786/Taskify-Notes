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


# TEMP STORAGE (so app never fails)
memory_db = []


@app.get("/")
def home():
    return {"message": "Taskify Backend Running"}


@app.post("/extract-tasks")
def extract_tasks(data: NotesRequest):

    notes = data.notes

    tasks = [s.strip() for s in notes.split(".") if s.strip()]
    summary = "\n".join([f"• {t}" for t in tasks])

    # store in memory (safe mode)
    memory_db.append({
        "notes": notes,
        "summary": summary
    })

    return {
        "summary": summary,
        "tasks": tasks
    }


@app.get("/history")
def history():

    return [
        {
            "notes": item["notes"],
            "summary": item["summary"]
        }
        for item in reversed(memory_db)
    ]
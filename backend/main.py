from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NotesInput(BaseModel):
    notes: str

@app.get("/")
def home():
    return {"message": "Taskify backend running"}

@app.post("/extract-tasks")
def extract_tasks(data: NotesInput):

    notes = data.notes

    lines = notes.split("\n")

    tasks = []

    keywords = [
        "need",
        "submit",
        "finish",
        "buy",
        "call",
        "send",
        "bring",
        "check",
        "complete",
        "print",
        "upload",
        "remind",
        "clean",
        "book",
        "ask",
        "email",
        "prepare",
        "make"
    ]

    for line in lines:

        clean_line = line.strip()

        if clean_line == "":
            continue

        for keyword in keywords:

            if keyword.lower() in clean_line.lower():
                tasks.append(clean_line)
                break

    # fallback if nothing found
    if len(tasks) == 0:
        tasks = lines

    return {
        "tasks": tasks
    }
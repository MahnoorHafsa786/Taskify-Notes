# Taskify Notes 📝

Turn messy notes into action using AI.

## 📌 Problem Statement

Students and professionals often write messy notes containing tasks, reminders, and deadlines. It becomes difficult to manually identify important action items.

Taskify Notes solves this problem by automatically extracting tasks from unstructured notes and converting them into a checklist.

## 🎯 Target Users

* Students
* Teachers
* Professionals
* Anyone who manages notes or to-do tasks


## 💡 Why This Project?

I selected this idea because students usually write rough notes during lectures or meetings and later forget important tasks. This AI application helps convert messy notes into organized actionable tasks instantly.


## 🛠️ Technology Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* FastAPI (Python)

### AI

* Groq API (LLM)

### Deployment

* Netlify (Frontend)
* Cloudflare Tunnel (Backend)


## ⚙️ How The System Works

1. User pastes notes into the frontend.
2. JavaScript sends the notes to the FastAPI backend using a Fetch POST request.
3. Backend receives the notes.
4. Backend sends the notes to the Groq AI API.
5. AI extracts meaningful tasks from the messy text.
6. Backend returns extracted tasks as JSON data.
7. Frontend displays the tasks as a checklist.


## 🧠 AI Concept Used

This project uses:

* Large Language Model (LLM)
* Insight Generation
* Natural Language Processing (NLP)

The AI understands human-written messy notes and extracts actionable tasks.


## 🚀 Setup Instructions

### 1. Clone Repository

git clone https://github.com/MahnoorHafsa786/Taskify-Notes.git

### 2. Open Project Folder

cd taskify-notes

### 3. Create Virtual Environment

python -m venv venv

### 4. Activate Virtual Environment

Windows:

venv\Scripts\activate

### 5. Install Dependencies

pip install -r requirements.txt

### 6. Run Backend

uvicorn main:app --reload

### 7. Run Cloudflare Tunnel

.\cloudflared.exe tunnel --url http://localhost:8000

### 8. Open Frontend

Open index.html or Netlify deployed link.


## 🌐 Live Demo

Frontend Live Link:
https://tangerine-kitten-ba8d92.netlify.app/

GitHub Repository:
https://github.com/MahnoorHafsa786/Taskify-Notes

## ⚠️ Limitations

* Backend depends on Cloudflare Tunnel running locally.
* Database integration is incomplete.
* Internet connection is required.


## 🔮 Future Improvements

* Permanent cloud backend deployment
* Database history saving
* Better task categorization

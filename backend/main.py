import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from dotenv import load_dotenv

# .env file-oda exact path-ai load panna
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

app = FastAPI()

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Connection
MONGO_URI = os.getenv("MONGO_URI")

try:
    client = MongoClient(MONGO_URI)
    db = client["dementia_care_db"]
    client.admin.command("ping")
    print(" MongoDB Atlas Connected Successfully!")
except Exception as e:
    print(f" MongoDB Connection Failed: {e}")


@app.get("/")
def home():
    return {
        "message": "Dementia Care Backend is Working!",
        "database": "Connected to MongoDB",
    }
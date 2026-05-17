from fastapi import FastAPI
from .database import engine, Base
from .routes import router

from . import models

app = FastAPI()

# create database tables
Base.metadata.create_all(bind=engine)

# include routes
app.include_router(router) 
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
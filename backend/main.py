from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models, db, routes
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","https://www.devfolio.one"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=db.engine)

app.include_router(routes.router)
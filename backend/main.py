from fastapi import FastAPI
from . import models, db, routes
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

models.Base.metadata.create_all(bind=db.engine)

app.include_router(routes.router)
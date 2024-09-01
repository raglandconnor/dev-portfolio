from fastapi import FastAPI
from . import models, db, routes

app = FastAPI()

models.Base.metadata.create_all(bind=db.engine)

app.include_router(routes.router)
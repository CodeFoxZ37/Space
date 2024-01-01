import mysql.connector
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

connection = mysql.connector.connect(
    host = "localhost",
    port = "3306",
    user = "root",
    password = "root24",
    database = "computosmd_space"
)

cursor = connection.cursor()
consulta_sql = "SELECT Users, Score FROM space_score"
cursor.execute(consulta_sql)
resultados = cursor.fetchall()
df = pd.DataFrame(resultados)

app = FastAPI()

@app.get("/")

def info():
    return {"user":df}


origins = [
    "http://127.0.0.1:5500",  # Suponiendo que tu frontend se ejecuta en el puerto 3000
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

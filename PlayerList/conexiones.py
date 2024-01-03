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
sqls = [
    "SELECT Users FROM space_score",
    "SELECT Score FROM space_score"
]

for sql in sqls:
    cursor.execute(sql)
    for row in cursor.fetchall():
     resultados = cursor.fetchall()

df = pd.DataFrame(resultados)
app = FastAPI()

cursor.close()
connection.close()

@app.get("/")

def info():
    return {"user":f"{df}"}


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
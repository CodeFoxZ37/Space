import mysql.connector
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class Item(BaseModel):
    username: str
    score: int

# Establecer conexión global
connection = mysql.connector.connect(
    host="216.137.177.250",
    port="3306",
    user="computosmd_space",
    password="2007_Space.001",
    database="computosmd_space"
)

app = FastAPI()

@app.get("/")
def info():
    cursor = connection.cursor()
    cursor.execute("SELECT User, Score FROM space_score ORDER BY Score DESC")
    results = cursor.fetchall()
    Users = ",".join([str(item[0]) for item in results])
    Scores = ",".join([str(item[1]) for item in results])  # Nota el índice '1' aquí
    cursor.close()
    return {"user": Users, "score": Scores}

@app.post("/form")
async def form(username: str = Form(...), password: str = Form(...)):
    try:
        cursor = connection.cursor()
        query = "INSERT INTO Users(User, Password) VALUES (%s, %s)"
        values = (username, password)
        cursor.execute(query, values)
        connection.commit()
    except mysql.connector.Error as err:
        print(f"Hubo un error: {err}")
        return {"error": str(err)}
    finally:
        cursor.close()
    return {"message": "Usuario añadido con éxito"}

@app.post("/score")
async def update():
 query = """
    UPDATE usuarios
    SET puntuacion = %s
    WHERE username = %s AND puntuacion < %s;
   """
# Configuración de CORS
origins = ["http://127.0.0.1:5500"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

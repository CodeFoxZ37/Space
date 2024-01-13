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
async def info():
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
        query_user_existence = "SELECT COUNT(*) FROM Users WHERE User = %s"
        cursor.execute(query_user_existence, (username,))
        (user_count,) = cursor.fetchone()  # Obtiene el resultado de la consulta

        if user_count > 0:
            query_password = "SELECT Password FROM Users WHERE User = %s"
            cursor.execute(query_password, (username,))
            (stored_password,) = cursor.fetchone()  # Obtiene la contraseña almacenada

            if stored_password == password:
                return {"message": True}
            else:
                return {"message": False}
        else:
            # Si el usuario no existe, añádelo
            query_add_user = "INSERT INTO Users(User, Password) VALUES (%s, %s)"
            cursor.execute(query_add_user, (username, password))

            query_add_score = "INSERT INTO space_score(User, Score) VALUES (%s, 0)"
            cursor.execute(query_add_score, (username,))
            connection.commit()
            return {"message": "Usuario añadido con éxito"}
    except mysql.connector.Error as err:
        print(f"Hubo un error: {err}")
        return {"error": str(err)}
    finally:
        cursor.close()

@app.post("/score")
async def update(item: Item):
 try:
     cursor = connection.cursor()
     query = """
     UPDATE space_score
     SET Score = %s
     WHERE User = %s AND Score < %s;
     """
     values = (item.score, item.username, item.score)
     cursor.execute(query,values)
     connection.commit()
 except mysql.connector.Error as err:
        print(f"Hubo un error: {err}")
        return {"error": str(err)}
 finally:
     cursor.close()

# Configuración de CORS
origins = ["http://127.0.0.1:5500"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

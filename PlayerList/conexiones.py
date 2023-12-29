import mysql.connector
import pandas as pd

connection = mysql.connector.connect(
    host = "216.137.177.250",
    port = "3306",
    user = "computosmd_space",
    password = "2007_Space.001",
    database = "computosmd_space"
)

cursor = connection.cursor()
consulta_sql = "SELECT * FROM space_score"
cursor.execute(consulta_sql)

# Obtener todos los resultados
resultados = cursor.fetchall()

print(resultados)

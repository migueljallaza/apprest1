# proyecto-final-api-rest-user

DEVELOPER: MIGUEL FRANZ JALLAZA CASTRO
CEDULA DE IDENTIDAD: 5963095 LPZ

1. clonar el proyecto
2. ingresar a la carpeta
3. digitar npm install
4. modificar las variables de pool para los parametros del gestor de base de datos de postgres
5. crear la base de datos
6. ejecutar el script para crear la tabla usuario

CREATE TABLE sfe_giec.usuario (
id serial NOT NULL,
cedula_identidad varchar(40) NOT NULL,
nombres varchar(150) NOT NULL,
primer_apellido varchar(140) NOT NULL,
segundo_apellido varchar(140) NOT NULL,
fecha_nacimiento date not NULL,
CONSTRAINT usuario_pk PRIMARY KEY (id)
);

7. iniciar el proyecto: node main.js


validar con los siguientes end-point en POSTMAN

METODO GET - LISTA DE USUARIOS
http://localhost:3000/user/list

METODO POST - ADICION DE USUARIO
http://localhost:3000/user

BODY
{
    "cedula_identidad": "1111112",
    "nombres": "elio",
    "primer_apellido": "cabrera",
    "segundo_apellido": "teran",
    "fecha_nacimiento": "1965-02-01"
}

METODO PUT - MODIFICAR USUARIO POR ID
http://localhost:3000/user/100

METODO GET - OBTENER USUARIO POR ID
http://localhost:3000/user/100

METODO DELETE - ELIMINAR USUARIO POR ID
http://localhost:3000/user/100

METODO GET - OBTENER EL PROMEDIO DE EDADES
http://localhost:3000/user/average




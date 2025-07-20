GUÍA DE INSTALACIÓN Y PUESTA EN MARCHA DEL PROYECTO
===================================================

1)_ Instalar e iniciar el servico de MySQL en la computadora

2)_ Crear el archivo ".env" en la raíz del proyecto que contenga lo siguiente

    # Base de datos MySQL
    DB_NAME=isoandiso_db
    DB_USER=root
    DB_PASSWORD=password //ponerle la contrasña que pusieron en su usuario de MySQL en el momento de instalarlo, sino crear o cambiarle de contraseña a la cuenta root de MySQL y poner la contraseña acá
    DB_HOST=localhost
    DB_PORT=3306

    # Otras variables existentes
    TOKEN_SECRET=tu_secret_key
    ORIGIN=http://localhost:3000
    PORT=3000

3)_ En una terminal crear la base de datos entrando en MySQL con el siguinte código:
    mysql -u root -p;(pedirá la contraseña del usuario root)

    Luego ejecutar lo siguiente para crear la base de datos:
    create database isoandiso_db;  


4)_ En otra terminal correr "npm i" y luego "npm run dev"

    debe verse en la terminal el siguiente mensaje:

    "Server listening on port 3000
    MySQL connected via Sequelize...
    Database synchronized..."


5)_ Instertar datos de prueba en las tablas de la base de datos corriendo:

    node app/test_insert_data.js



MODULOS Y RELACIONES
====================

Modulos:

-Cada vez que se crea un modulo se debe importar en "app.js" debajo de "// Importar modelos"
 y en "table_relations.js" para dejarlo preparado para las relaciones debajo de "// Importar todos los modelos"

Relaciones:

-Las relaciones entre las tablas (belongsTo,hasMany..) se ponen en "table_relations.js"
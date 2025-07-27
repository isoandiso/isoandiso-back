-Primeramente deben instalar mongodb en su computadora
(luego de instalado correr "net start MongoDB" (este comando es si estamos en Windows) en una terminal para iniciar el servicio de mongodb, es muy importante)
-Luego deben crear el archivo .env en la raíz del proyecto con lo siguiente:

PORT= 3000
URI= mongodb://localhost:27017/isoandiso
ORIGIN= http://localhost:5174
TOKEN_SECRET= f82b8b2e7e4c3d1ab96fa2d4d95e5f2e6c7a4f8c1e6a3d7b5c4a9b0e4c7f2a3d

(comrobar que el ORIGIN coincida con la ruta del frontend en el cual van a usar este back)
(acordarse de en producción cambiar el TOKEN_SECRET y no usar este, ya que este quedará en este próximo
commit que estoy por hacer con este README)

-Luego en una terminal nueva correr el comando "npm i"
-Luego entrar a mongodb corriendo en la terminal "mongosh" (o el comando que sea, ya que a veces se entra con mongod)
-Una vez dentro ejecutar "use isoandiso" para crear la base de datos "isoandiso"
-Luego en la terminal en donde ejecutamos "npm i" ejecutar "npm run dev" (esto hará que se creen todas
las tablas en la base de datos isoandiso)
-Luego en la terminal de mongodb que estabamos recién correr el comando "load("setupData.js")" para ingresar
datos en las tablas que luego usaremos en el front
(dichos datos deben subirse en el servidor ya precargados en la tabla (consultar a Andy))
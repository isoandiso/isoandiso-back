// db.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'isoandiso_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, // Cambiar a console.log para ver las queries SQL
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      underscored: true, // usa snake_case para nombres de columnas
      freezeTableName: true // mantiene los nombres de tabla como están
    }
  }
);

module.exports = sequelize;

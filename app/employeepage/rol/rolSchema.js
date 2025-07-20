const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const Rol = sequelize.define('rol', {
  name: {
    type: DataTypes.ENUM('Jefe', 'Asistente', 'Supervisor', 'Colaborador'),
    allowNull: false,
  },
}, {
  tableName: 'rol',
  timestamps: true,
});

module.exports = Rol;
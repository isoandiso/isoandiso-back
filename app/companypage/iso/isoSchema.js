const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const Iso = sequelize.define('iso', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'iso',
});

module.exports = Iso;

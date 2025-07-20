const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const GeneralObjective = sequelize.define('general_objective', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'general_objective',
  timestamps: true,
});

module.exports = GeneralObjective;

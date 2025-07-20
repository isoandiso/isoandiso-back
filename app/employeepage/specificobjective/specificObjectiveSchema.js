const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const SpecificObjective = sequelize.define('specific_objective', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  generalObjectiveId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'general_objective',
      key: 'id',
    },
    field: 'general_objective_id',
  },
}, {
  tableName: 'specific_objective',
  timestamps: true,
});

module.exports = SpecificObjective;

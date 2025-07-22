const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const ManagementTool = sequelize.define('management_tool', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specificObjectiveId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'specific_objective',
      key: 'id',
    },
    field: 'specific_objective_id',
  },
}, {
  tableName: 'management_tool',
});

module.exports = ManagementTool;

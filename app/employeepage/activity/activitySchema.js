const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const Activity = sequelize.define('activity', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  managementToolId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'management_tool',
      key: 'id',
    },
    field: 'management_tool_id',
  },
}, {
  tableName: 'activity',
  timestamps: true,
});

module.exports = Activity;

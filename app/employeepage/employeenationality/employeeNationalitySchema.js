const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const EmployeeNationality = sequelize.define('employee_nationality', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'employee_nationality',
  timestamps: true,
});

module.exports = EmployeeNationality;
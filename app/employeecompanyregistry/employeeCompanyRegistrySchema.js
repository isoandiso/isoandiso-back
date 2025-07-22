const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const EmployeeCompanyRegistry = sequelize.define('employeeCompanyRegistry', {
  employeeEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      isGmail(value) {
        if (!value.endsWith('@gmail.com')) {
          throw new Error('El email debe ser una dirección de Gmail válida');
        }
      }
    }
  },
  companyIds: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],
    validate: {
      isArray(value) {
        if (!Array.isArray(value)) {
          throw new Error('companyIds debe ser un array');
        }
      }
    }
  }
}, {
  tableName: 'employee_company_registry',
  hooks: {
    beforeValidate: (registry) => {
      if (registry.employeeEmail) {
        registry.employeeEmail = registry.employeeEmail.toLowerCase();
      }
    }
  }
});

module.exports = EmployeeCompanyRegistry;

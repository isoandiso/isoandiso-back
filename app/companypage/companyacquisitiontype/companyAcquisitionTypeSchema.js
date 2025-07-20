const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const CompanyAcquisitionType = sequelize.define('company_acquisition_type', {
  name: {
    type: DataTypes.ENUM('Gratuito', 'Alquiler mensual', 'Alquiler anual', 'Compra'),
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'company_acquisition_type',
  timestamps: true,
});

module.exports = CompanyAcquisitionType;
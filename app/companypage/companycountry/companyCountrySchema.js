const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const countryNames = [
  'Argentina', 'Bolivia', 'Chile', 'Colombia', 'Costa Rica', 'Cuba', 'Ecuador',
  'El Salvador', 'Guatemala', 'Honduras', 'México', 'Nicaragua', 'Panamá',
  'Paraguay', 'Perú', 'Puerto Rico', 'República Dominicana', 'Uruguay', 'Venezuela'
];

const CompanyCountry = sequelize.define('companyCountry', {
  name: {
    type: DataTypes.ENUM(...countryNames),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'company_country',
  timestamps: true
});

module.exports = CompanyCountry;
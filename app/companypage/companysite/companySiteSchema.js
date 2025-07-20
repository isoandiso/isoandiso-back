const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const CompanySite = sequelize.define('company_site', {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [1, 100],
      is: {
        args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s.-]+$/,
        msg: 'El campo nombre de la sede y dirección solo acepta letras (incluyendo acentos y caracteres latinos especiales), números, espacios, puntos (.) y guiones (-)'
      }
    }
  },
  address: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      len: [1, 200],
      is: {
        args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s.-]+$/,
        msg: 'El campo dirección de la sede solo acepta letras (incluyendo acentos y caracteres latinos especiales), números, espacios, puntos (.) y guiones (-)'
      }
    }
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [1, 100],
      is: {
        args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.-]+$/,
        msg: 'El campo ciudad no acepta números.'
      }
    }
  },
  province: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [1, 100],
      is: {
        args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.-]+$/,
        msg: 'El campo provincia no acepta números.'
      }
    }
  }
}, {
  tableName: 'company_site',
  timestamps: true,
});

module.exports = CompanySite;

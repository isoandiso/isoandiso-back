const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const Subcompany = sequelize.define('subcompany', {
  ruc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  socialReason: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  economicActivity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  economicSector: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companySize: {
    type: DataTypes.ENUM('Micro', 'Pequeña', 'Mediana', 'Grande'),
    allowNull: false,
  },
  entryDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  contractTerminationDate: {
    type: DataTypes.DATE,
    allowNull: true,
    validate: {
      isAfterEntryDate(value) {
        if (value && this.entryDate && value <= this.entryDate) {
          throw new Error('La fecha de término de contrato debe ser mayor a la fecha de ingreso.');
        }
      }
    },
    defaultValue: null,
  },
}, {
  tableName: 'subcompany',
});

module.exports = Subcompany;

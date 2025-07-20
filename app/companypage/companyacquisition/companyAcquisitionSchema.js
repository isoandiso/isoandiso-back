const { DataTypes } = require('sequelize');
const sequelize = require('../../db');
const CompanyAcquisitionType = require('../companyacquisitiontype/companyAcquisitionTypeSchema');

const CompanyAcquisition = sequelize.define('companyAcquisition', {
  acquisitionDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  expirationDate: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  },
  invoiceLink: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
    unique: true
  },
  acquisitionTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'company_acquisition_type',
      key: 'id',
    },
    field: 'acquisition_type_id',
  }
}, {
  tableName: 'company_acquisition',
  timestamps: true,
  hooks: {
    beforeSave: async (acquisition) => {
      try {
        if (acquisition.changed('acquisitionTypeId') || acquisition.changed('acquisitionDate')) {
          const acquisitionType = await CompanyAcquisitionType.findByPk(acquisition.acquisitionTypeId);
          if (!acquisitionType) {
            throw new Error('Tipo de adquisición no encontrado');
          }

          const acquisitionTypeName = acquisitionType.name;

          if (acquisitionTypeName !== 'Compra') {
            let additionalMonths;
            switch (acquisitionTypeName) {
              case "Gratuito":
                additionalMonths = 2;
                break;
              case "Alquiler mensual":
                additionalMonths = 1;
                break;
              case "Alquiler anual":
                additionalMonths = 12;
                break;
              default:
                additionalMonths = 0;
            }
            if (additionalMonths !== 0) {
              const expirationDate = new Date(acquisition.acquisitionDate);
              expirationDate.setMonth(expirationDate.getMonth() + additionalMonths);
              acquisition.expirationDate = expirationDate;
            }
          }
        }
      } catch (error) {
        throw error;
      }
    }
  }
});

module.exports = CompanyAcquisition;

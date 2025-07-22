const { DataTypes, Op } = require('sequelize');
const sequelize = require('../../db');
const bcrypt = require('bcryptjs');

const Company = sequelize.define('company', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isStrongPassword(value) {
        if (value.length < 8) throw new Error('La contraseña debe tener como mínimo 8 caracteres.');
        if (!/[a-zA-Z]/.test(value)) throw new Error('La contraseña debe contener al menos una letra.');
        if (!/[0-9]/.test(value)) throw new Error('La contraseña debe contener al menos un número.');
        if (!/[^a-zA-Z0-9\s]/.test(value)) throw new Error('La contraseña debe contener al menos un símbolo.');
      }
    }
  },
  ruc: {
    type: DataTypes.STRING(14),
    allowNull: true,
    defaultValue: null,
    unique: true,
    validate: {
      is: {
        args: /^[a-zA-Z0-9.-]+$/,
        msg: 'El RUC debe contener solo números, letras, guiones y puntos.'
      }
    }
  },
  socialReason: {
    type: DataTypes.STRING(200),
    allowNull: true,
    defaultValue: null,
    validate: {
      is: {
        args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s.-]+$/,
        msg: 'La razón social solo puede contener letras, números, espacios, puntos y guiones.'
      }
    }
  },
  countryId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    references: {
      model: 'company_country',
      key: 'id',
    },
    field: 'country_id',
  },
  province: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: null,
    validate: {
      is: {
        args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.-]+$/,
        msg: 'El campo provincia no acepta números.'
      }
    }
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null,
    validate: {
      is: {
        args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.-]+$/,
        msg: 'El campo ciudad no acepta números.'
      }
    }
  },
  address: {
    type: DataTypes.STRING(200),
    allowNull: true,
    defaultValue: null,
    validate: {
      is: {
        args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s.-]+$/,
        msg: 'La dirección solo puede contener letras, números, espacios, puntos y guiones.'
      }
    }
  },
  economicActivity: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null,
    validate: {
      is: {
        args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s.-]+$/,
        msg: 'La actividad económica solo puede contener letras, números, espacios, puntos y guiones.'
      }
    }
  },
  economicSector: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: null,
    validate: {
      is: {
        args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s.-]+$/,
        msg: 'El sector económico solo puede contener letras, números, espacios, puntos y guiones.'
      }
    }
  },
  companySize: {
    type: DataTypes.ENUM('Micro', 'Pequeña', 'Mediana', 'Grande'),
    allowNull: true,
    defaultValue: null
  }
}, {
  tableName: 'company',
  indexes: [
    {
      unique: true,
      fields: ['ruc'],
      where: {
        ruc: {
          [Op.ne]: null
        }
      }
    }
  ],
  hooks: {
    beforeValidate: (company) => {
      if (company.email) {
        company.email = company.email.toLowerCase();
      }
    },
    beforeSave: async (company) => {
      if (company.password && company.changed('password')) {
        company.password = await bcrypt.hash(company.password, 10);
      }
    },
    beforeDestroy: async (company) => {
      try {
        // Eliminar adquisiciones, sitios y áreas asociados
        const acquisitions = await company.getAcquisitions();
        const sites = await company.getSites();
        const areas = await company.getAreas();

        if (acquisitions && acquisitions.length > 0) {
          await Promise.all(acquisitions.map(acquisition => acquisition.destroy()));
        }
        if (sites && sites.length > 0) {
          await Promise.all(sites.map(site => site.destroy()));
        }
        if (areas && areas.length > 0) {
          await Promise.all(areas.map(area => area.destroy()));
        }
      } catch (error) {
        console.error('Error en beforeDestroy hook:', error);
        throw error;
      }
    }
  }
});

module.exports = Company;
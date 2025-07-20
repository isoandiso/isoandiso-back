const { DataTypes } = require('sequelize');
const sequelize = require('../../db');
const bcrypt = require('bcryptjs');
const EmployeeCompanyRegistry = require('../../employeecompanyregistry/employeeCompanyRegistrySchema.js');

const Employee = sequelize.define('employee', {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      isGmail(value) {
        if (!value.endsWith('@gmail.com')) {
          throw new Error('El email debe ser una dirección de Gmail válida');
        }
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
    validate: {
      isStrongPasswordOrNull(value) {
        if (value === null) return;
        if (value.length < 8) throw new Error('La contraseña debe tener como mínimo 8 caracteres.');
        if (!/[a-zA-Z]/.test(value)) throw new Error('La contraseña debe contener al menos una letra.');
        if (!/[0-9]/.test(value)) throw new Error('La contraseña debe contener al menos un número.');
        if (!/[^a-zA-Z0-9\s]/.test(value)) throw new Error('La contraseña debe contener al menos un símbolo.');
      }
    }
  },
  dni: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      is: {
        args: /^[A-Za-z0-9- ]{5,15}$/,
        msg: 'Dni no válido'
      }
    }
  },
  mothers_lastname: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  fathers_lastname: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  birthDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  companyAreaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'company_area',
      key: 'id',
    },
    field: 'company_area_id',
  },
  entryDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  contractTerminationDate: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
    validate: {
      isAfterEntryDate(value) {
        if (value && this.entryDate && value <= this.entryDate) {
          throw new Error('La fecha de término de contrato debe ser mayor a la fecha de ingreso.');
        }
      }
    }
  },
  areaEntryDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  province: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      is: {
        args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.-]+$/,
        msg: 'El campo provincia no acepta números.'
      }
    }
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      is: {
        args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.-]+$/,
        msg: 'El campo ciudad no acepta números.'
      }
    }
  },
  address: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      is: {
        args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s.-]+$/,
        msg: 'La dirección solo puede contener letras, números, espacios, puntos y guiones.'
      }
    }
  },
  district: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      is: {
        args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s.-]+$/,
        msg: 'El distrito solo puede contener letras, números, espacios, puntos y guiones.'
      }
    }
  },
  corporateEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    }
  },
  nationalityId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'employee_nationality',
      key: 'id',
    },
    field: 'nationality_id',
  },
  gender: {
    type: DataTypes.ENUM('Masculino', 'Femenino'),
    allowNull: false,
  },
  civilStatus: {
    type: DataTypes.ENUM('Soltero/a', 'Casado/a','Divorciado/a','Conviviente','Viudo/a'),
    allowNull: false,
  },
  personalPhone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: /^[+()\-.\s\d]+$/,
        msg: 'Número de teléfono inválido. Solo se permiten dígitos, espacios, paréntesis, guiones y el símbolo +.'
      }
    }
  },
  facialRecognition: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  digitalSignature: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Activo', 'Inactivo'),
    allowNull: false,
  },
  employeeSiteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'company_site',
      key: 'id',
    },
    field: 'employee_site_id',
  },
  rolId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'rol',
      key: 'id',
    },
    field: 'rol_id',
  },
  sizePants: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isIn: {
        args: [[26, 28, 30, 32, 34, 36, 38, 40, 42, 44]],
        msg: 'Talla de pantalón inválida.'
      }
    }
  },
  sizePolo: {
    type: DataTypes.ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'),
    allowNull: false,
  },
  sizeShoe: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isIn: {
        args: [[36, 38, 40, 42, 44]],
        msg: 'Talla de zapato inválida.'
      }
    }
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'company',
      key: 'id',
    },
    field: 'company_id',
    defaultValue: null,
  },
}, {
  tableName: 'employee',
  timestamps: true,
  hooks: {
    beforeValidate: (employee) => {
      if (employee.email) {
        employee.email = employee.email.toLowerCase();
      }
      if (employee.corporateEmail) {
        employee.corporateEmail = employee.corporateEmail.toLowerCase();
      }
    },
    beforeSave: async (employee) => {
      if (employee.password && employee.changed('password')) {
        employee.password = await bcrypt.hash(employee.password, 10);
      }
    },
    beforeDestroy: async (employee) => {
      try {
        const employeeEmail = employee.email;
        const companyIdToRemove = employee.companyId;

        if (employeeEmail && companyIdToRemove) {
          const registry = await EmployeeCompanyRegistry.findOne({
            where: { employeeEmail: employeeEmail }
          });
          
          if (registry && registry.companyIds) {
            // Remover el companyId del array
            const updatedCompanyIds = registry.companyIds.filter(id => id !== companyIdToRemove);
            await registry.update({ companyIds: updatedCompanyIds });
          }
        }
      } catch (error) {
        console.error('Error en beforeDestroy hook:', error);
        throw error;
      }
    }
  }
});

module.exports = Employee;
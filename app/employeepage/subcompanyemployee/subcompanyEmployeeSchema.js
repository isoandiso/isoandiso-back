const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const SubcompanyEmployee = sequelize.define('subcompany_employee', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
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
  areaName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  siteName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  entryDate: {
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
    type: DataTypes.STRING,
    allowNull: false,
  },
  corporateEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  nationalityId: {
    type: DataTypes.INTEGER,
    allowNull: true,
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
  employeeSite: {
    type: DataTypes.STRING,
    allowNull: false,
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
}, {
  tableName: 'subcompany_employee',
  timestamps: true,
  hooks: {
    beforeValidate: (employee) => {
      if (employee.email) {
        employee.email = employee.email.toLowerCase();
      }
      if (employee.corporateEmail) {
        employee.corporateEmail = employee.corporateEmail.toLowerCase();
      }
    }
  }
});

module.exports = SubcompanyEmployee;


const { DataTypes } = require('sequelize');
const sequelize = require('../../db');
const bcrypt = require('bcryptjs');

const User = sequelize.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
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
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isStrongPassword(value) {
        if (value.length < 8) {
          throw new Error('La contraseña debe tener como mínimo 8 caracteres.');
        }
        if (!/[a-zA-Z]/.test(value)) {
          throw new Error('La contraseña debe contener al menos una letra.');
        }
        if (!/[0-9]/.test(value)) {
          throw new Error('La contraseña debe contener al menos un número.');
        }
        if (!/[^a-zA-Z0-9\s]/.test(value)) {
          throw new Error('La contraseña debe contener al menos un símbolo.');
        }
      }
    }
  }
}, {
  tableName: 'user',
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  }
});

module.exports = User;


const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.endsWith('@gmail.com');
      },
      message: `El email debe ser una dirección de Gmail válida`
    }
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // Mínimo 8
        if (v.length < 8) {
          return false;
        }
        // Al menos una letra
        if (!/[a-zA-Z]/.test(v)) {
          return false;
        }
        // Al menos un número
        if (!/[0-9]/.test(v)) {
          return false;
        }
        // Al menos un símbolo (caracteres no alfanuméricos ni espacio)
        if (!/[^a-zA-Z0-9\s]/.test(v)) {
          return false;
        }
        return true;
      },
      message: `La contraseña debe tener como minimo 8 caracteres y contener al menos una letra, un número y un símbolo.`
    }
  }
},
{
  timestamps: true
}
);

// Middleware pre-save para convertir el email a minúsculas y para hashear la contraseña
userSchema.pre('save', async function(next) {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Manejo de errores de unicidad
userSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    if (error.keyPattern && error.keyPattern.email) {
      return next(new Error('El email ya existe'));
    }
  }
  next(error);
});

module.exports = mongoose.model('user', userSchema);;

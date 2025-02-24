
const mongoose = require('mongoose');
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
  password: { type: String, required: true}
},
{
  timestamps: true
}
);

// Middleware pre-save para convertir el email a minúsculas
userSchema.pre('save', function(next) {
  this.email = this.email.toLowerCase();
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

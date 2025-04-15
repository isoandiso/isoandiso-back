const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const companySchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: `El email no es un email válido!`
    }
  },
  phone: { type: String, default:null},
  password: { type: String, required: true,validate: {
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
  } },
  ruc: { type: String, maxlength: 14, default: null, match: [/^[a-zA-Z0-9.-]+$/, 'El RUC debe contener solo números, letras, guiones y puntos.']},
  socialReason: { type: String, maxlength: 200, default: null, match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s.-]+$/, 'La razón social solo puede contener letras, números, espacios, puntos y guiones.'] },
  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companyCountry',
    default: null,
  },
  province: { type: String, maxlength: 50, default: null, match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.-]+$/, 'el campo provincia no acepta números.'] },
  city: { type: String, maxlength: 100, default: null, match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.-]+$/, 'el campo ciudad no acepta números.'] },
  address: { type: String, maxlength: 200, default: null, match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s.-]+$/, 'La dirección solo puede contener letras, números, espacios, puntos y guiones.'] },
  economicActivity: { type: String, maxlength: 100, default: null, match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s.-]+$/, 'La actividad económica solo puede contener letras, números, espacios, puntos y guiones.'] },
  economicSector: { type: String, maxlength: 50, default: null, match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s.-]+$/, 'El sector económico solo puede contener letras, números, espacios, puntos y guiones.'] },
  companySize: { type: String, enum: ['Micro', 'Pequeña', 'Mediana', 'Grande'],  default: null },
  acquisitionIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companyAcquisition',
    default: null,
  }],
  siteIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companySite',
    default: null,
  }],
  areaIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companyArea',
    default: null,
  }],
},
{
  timestamps: true
});

// Permitir repetir el valor null en los siguientes campos unique
companySchema.index({ ruc: 1 }, { unique: true, partialFilterExpression: { ruc: { $ne: null } } });

// Middleware pre-save para convertir el email a minúsculas y hashear la password
companySchema.pre('save', async function(next) {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Manejo de errores de unicidad
companySchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    if (error.keyPattern && error.keyPattern.email) {
      return next(new Error('El email ya existe'));
    }
  }
  next(error);
});

module.exports = mongoose.model('company', companySchema);
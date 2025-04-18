const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const employeeSchema = new mongoose.Schema({
  name:{
    type: String,
    default: null,
  },
  lastname:{
    type: String,
    default: null
  },
  email: { 
    type: String, 
    required: true, 
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.endsWith('@gmail.com');
      },
      message: `El email debe ser una dirección de Gmail válida`
    }
  },
  password: { type: String, default: null,validate: {
    validator: function(v) {
      // Permite null
      if (v === null) return true;

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
  dni: {type: String, required: true, match:[/^[A-Za-z0-9- ]{5,15}$/, "Dni no válido"], maxlength: 20},
  mothers_lastname: {type: String, required: true, maxlength: 20},
  fathers_lastname: {type: String, required: true, maxlength: 20},
  birthDate: {type: Date, required: true},
  companyAreaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companyArea',
    required: true
  },
  charge: {type: String, required: true},
  entryDate: {type: Date, required: true},
  contractTerminationDate : {
    type: Date,
    validate: {
      validator: function (v) {
        if(v!==null){
          return v > this.entryDate;
        }
      },
      message: props => `La fecha de término de contrato (${props.value}) debe ser mayor a la fecha de ingreso (${this.entryDate}).`,
    },
    default: null,
  },
  areaEntryDate: {type: Date, required: true},
  province: { type: String, maxlength: 50, required:true, match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.-]+$/, 'el campo provincia no acepta números.'] },
  city: { type: String, maxlength: 100, required:true, match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.-]+$/, 'el campo ciudad no acepta números.'] },
  address: { type: String, maxlength: 200, required:true, match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s.-]+$/, 'La dirección solo puede contener letras, números, espacios, puntos y guiones.'] },
  district: { type: String, maxlength: 200, required:true, match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s.-]+$/, 'El distrito solo puede contener letras, números, espacios, puntos y guiones.'] },
  corporateEmail: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  nationalityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'nationalityEmployee',
    required: true
  },
  gender: { 
    type: String, 
    enum: ['Masculino', 'Femenino'],
    required: true
  },
  civilStatus: { 
    type: String, 
    enum: ['Soltero/a', 'Casado/a','Divorciado/a','Conviviente','Viudo/a'],
    required: true
  },
  personalPhone: {type: String, required: true, match: [/^[+()\-.\s\d]+$/, "Número de teléfono inválido. Solo se permiten dígitos, espacios, paréntesis, guiones y el símbolo '+' para prefijos internacionales."]},
  facialRecognition: {type: String, default: null},
  digitalSignature: {type: String, default: null},
  status: { 
    type: String, 
    enum: ['Activo', 'Inactivo'],
    required: true
  },
  employeeSiteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companySite',
    required: true
  },
  rolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'rol',
    required: true
  },
  sizePants: {type: Number, required: true, enum: [26, 28, 30, 32, 34, 36, 38, 40, 42, 44]},
  sizePolo: {type: String, required: true, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']},
  sizeShoe: {type: Number, required: true, enum: [36, 38, 40, 42, 44]},
}, 
{ 
  timestamps: true 
});

// Middleware pre-save para convertir el email a minúsculas y hashear la contraseña
employeeSchema.pre('save', async function(next) {
  this.email = this.email.toLowerCase();
  if(this.password){
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('employee', employeeSchema);

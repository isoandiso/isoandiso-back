const mongoose = require('mongoose');

const subcompanyWorkerSchema = new mongoose.Schema({
  dni: {type: String, required: true},
  name: {type: String, required: true},
  mothers_lastname: {type: String, required: true},
  fathers_lastname: {type: String, required: true},
  birthDate: {type: Date, required: true},
  projectName:{type: String, required: true},
  charge: {type: String, required: true},
  entryDate: {type: Date, required: true},
  province: { type: String, maxlength: 50, required:true, match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.-]+$/, 'el campo provincia no acepta números.'] },
  city: { type: String, maxlength: 100, required:true, match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.-]+$/, 'el campo ciudad no acepta números.'] },
  address: { type: String, maxlength: 200, required:true, match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s.-]+$/, 'La dirección solo puede contener letras, números, espacios, puntos y guiones.'] },
  district: {type: String, required: true},
  corporateEmail: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  personalEmail: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@gmail\.com$/,
  },
  nationalityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'nationalityWorker',
    default: null
  },
  gender: { 
    type: String, 
    enum: ['Masculino', 'Femenino'],
    required: true
  },
  civilStatus: { 
    type: String, 
    enum: ['Soltero', 'Casado','Divorciado','Conviviente','Viudo/da'],
    required: true
  },
  personalPhone: {type: String, required: true},
  facialRecognition: {type: String, required: true},
  digitalSignature: {type: String, required: true},
  status: { 
    type: String, 
    enum: ['Activo', 'Inactivo'],
    required: true
  },
  workSite: {type: String, required: true},
  sizePants: {type: Number, required: true, enum: [26, 28, 30, 32, 34, 36, 38, 40, 42, 44]},
  sizePolo: {type: String, required: true, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']},
  sizeShoe: {type: Number, required: true, enum: [36, 38, 40, 42, 44]},
});

module.exports = mongoose.model('subcompanyWorker', subcompanyWorkerSchema);

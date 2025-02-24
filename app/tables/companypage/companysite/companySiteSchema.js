const mongoose = require('mongoose');

const companySiteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
    match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s.-]+$/, 'el campo nombre de la sede y direccion solo acepta letras (incluyendo acentos y caracteres latinos especiales), números, espacios (solo entre palabras, no al principio ni al final), puntos (.) y guiones (-)']
  },
  address: {
    type: String,
    required: true,
    maxlength: 200,
    match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s.-]+$/, 'el campo dirección de la sede y direccion solo acepta letras (incluyendo acentos y caracteres latinos especiales), números, espacios (solo entre palabras, no al principio ni al final), puntos (.) y guiones (-)']
  },
  city: {
    type: String,
    required: true,
    maxlength: 100,
    match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.-]+$/, 'el campo ciudad no acepta números.']
  },
  province: {
    type: String,
    required: true,
    maxlength: 100,
    match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.-]+$/, 'el campo provincia no acepta números.']
  }
});

module.exports = mongoose.model('companySite', companySiteSchema);

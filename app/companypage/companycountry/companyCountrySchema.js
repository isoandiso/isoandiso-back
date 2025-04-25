const mongoose = require('mongoose');

const companyCountrySchema = new mongoose.Schema({
  name: { type: String, enum: [
      'Argentina',
      'Bolivia',
      'Chile',
      'Colombia',
      'Costa Rica',
      'Cuba',
      'Ecuador',
      'El Salvador',
      'Guatemala',
      'Honduras',
      'México',
      'Nicaragua',
      'Panamá',
      'Paraguay',
      'Perú',
      'Puerto Rico',
      'República Dominicana',
      'Uruguay',
      'Venezuela',
    ], 
    required: true,
    unique: true
  },
  isoIds:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'iso',
    default: null,
  }]
});

module.exports = mongoose.model('companyCountry', companyCountrySchema);
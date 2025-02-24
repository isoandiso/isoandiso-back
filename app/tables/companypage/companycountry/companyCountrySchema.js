const mongoose = require('mongoose');

const companyCountrySchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  isoIds:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'iso',
    default: null,
  }]
});

module.exports = mongoose.model('companyCountry', companyCountrySchema);
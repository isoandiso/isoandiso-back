const mongoose = require('mongoose');

const isoSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
});

module.exports = mongoose.model('iso', isoSchema);

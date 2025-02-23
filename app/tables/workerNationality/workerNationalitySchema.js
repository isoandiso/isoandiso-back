const mongoose = require('mongoose');

const workerNationalitySchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
});

module.exports = mongoose.model('workerNationality', workerNationalitySchema);
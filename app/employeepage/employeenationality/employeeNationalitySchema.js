const mongoose = require('mongoose');

const employeeNationalitySchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
});

module.exports = mongoose.model('employeeNationality', employeeNationalitySchema);
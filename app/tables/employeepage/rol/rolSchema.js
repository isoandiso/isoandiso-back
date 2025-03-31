const mongoose = require('mongoose');

const rolSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['Jefe', 'Asistente','Supervisor','Colaborador'],
    required: true
  }
});

module.exports = mongoose.model('rol', rolSchema);
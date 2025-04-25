const mongoose = require('mongoose');

const EmployeeCompanyRegistry = new mongoose.Schema({
  employeeEmail: { 
    type: String, 
    required: true, 
    unique:true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.endsWith('@gmail.com');
      },
      message: `El email debe ser una dirección de Gmail válida`
    }
  },
  companyIds: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }],
}, 
{ 
  timestamps: true 
});

module.exports = mongoose.model('employeeCompanyRegistry', EmployeeCompanyRegistry);

const mongoose = require('mongoose');

const companyAreaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  charges:[{
    type: String,
    required: true,
  }],
  isoIds:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'iso',
    default: null
  }],
  responsibleWorkerId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'worker',
    default: null
  }
});

module.exports = mongoose.model('companyArea', companyAreaSchema);

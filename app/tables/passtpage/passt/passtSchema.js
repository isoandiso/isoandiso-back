const mongoose = require('mongoose');

const passtSchema = new mongoose.Schema({
   year: {
    type: Number,
    min:2000,
    max:3000,
    required: true,
  },
    companySiteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'companySite',
      default: null
    },

});

module.exports = mongoose.model('passt', passtSchema);

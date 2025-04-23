const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  managementToolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'managementTool',
    default: null,
  },
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('activity', activitySchema);;

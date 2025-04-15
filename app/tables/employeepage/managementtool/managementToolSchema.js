
const mongoose = require('mongoose');

const managementToolSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  specificObjectiveId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'specificObjective',
    default: null,
  },
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('managementTool', managementToolSchema);;

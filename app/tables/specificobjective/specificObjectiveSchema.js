
const mongoose = require('mongoose');

const specificObjectiveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  managementTool: {
    type: String,
    required: true,
  },
  generalObjectiveId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'generalObjective',
    default: null,
  },
}
);

module.exports = mongoose.model('specificObjective', specificObjectiveSchema);;

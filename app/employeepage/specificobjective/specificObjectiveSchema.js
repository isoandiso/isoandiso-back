const mongoose = require('mongoose');

const specificObjectiveSchema = new mongoose.Schema({
  description: {
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


const mongoose = require('mongoose');

const generalObjectiveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  goal: {
    type: String,
    required: true,
  },
  indicators: {
    type: String,
    required: true,
  },
  budget: {
    type: String,
    required: true,
  },
  resources: {
    type: String,
    required: true,
  },
}
);

module.exports = mongoose.model('generalObjective', generalObjectiveSchema);;

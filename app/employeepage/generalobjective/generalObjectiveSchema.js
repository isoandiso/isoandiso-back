const mongoose = require('mongoose');

const generalObjectiveSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
}
);

module.exports = mongoose.model('generalObjective', generalObjectiveSchema);;

const mongoose = require('mongoose');
const { Schema } = mongoose;

const GeneralObjectiveSchema = new Schema({
  _id: { type: String, required: true }, // UUID
  description: { type: String, required: true }
}, { _id: false });

const GeneralObjective = mongoose.model('GeneralObjective', GeneralObjectiveSchema);

module.exports = { GeneralObjectiveSchema, GeneralObjective };

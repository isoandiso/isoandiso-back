const mongoose = require('mongoose');
const { Schema } = mongoose;

const SpecificObjectiveSchema = new Schema({
  _id: { type: String, required: true }, // UUID
  description: { type: String, required: true },
  generalObjectiveId: { type: String, ref: 'GeneralObjective', required: true }
}, { _id: false });

const SpecificObjective = mongoose.model('SpecificObjective', SpecificObjectiveSchema);

module.exports = { SpecificObjectiveSchema, SpecificObjective };

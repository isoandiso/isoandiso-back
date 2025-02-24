
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company',
    default: null
  },
  isoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'iso',
    default: null,
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

module.exports = mongoose.model('activity', activitySchema);;

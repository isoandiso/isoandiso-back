
const mongoose = require('mongoose');

const activityCompletionDateSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  activityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'activity',
    default: null,
  },
}
);

module.exports = mongoose.model('activityCompletionDate', activityCompletionDateSchema);;

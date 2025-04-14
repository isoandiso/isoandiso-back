const mongoose = require('mongoose');
const { Schema } = mongoose;

const ActivitySchema = new Schema({
  _id: { type: String, required: true },
  description: { type: String, required: true },
  managementToolId: { type: String, ref: 'ManagementTool', required: true }
}, { _id: false });

const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = { ActivitySchema, Activity };

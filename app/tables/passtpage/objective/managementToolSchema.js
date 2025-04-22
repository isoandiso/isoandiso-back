const mongoose = require('mongoose');
const { Schema } = mongoose;

const ManagementToolSchema = new Schema({
  _id: { type: String, required: true },
  description: { type: String, required: true },
}, { _id: false });

const ManagementTool = mongoose.model('ManagementTool', ManagementToolSchema);

module.exports = { ManagementToolSchema, ManagementTool };


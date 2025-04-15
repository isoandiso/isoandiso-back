const managementToolSchema = require('./managementToolSchema');

const createmanagementTool = async (req) => {
  const managementTool = new managementToolSchema(req.body);
  await managementTool.save();
  return managementTool;
};

const getAllmanagementTools = async () => {
    const managementTools = await managementToolSchema.find();
    return managementTools;
};

const getmanagementTool = async (req) => {
  const managementToolId = req.params.id;
  const managementTool = await managementToolSchema.findById(managementToolId);
  return managementTool;
};

const deletemanagementTool = async (req) => {
  const managementToolId = req.params.id;
  await managementToolSchema.findByIdAndDelete(managementToolId);
};

module.exports = {
  createmanagementTool,
  getAllmanagementTools,
  getmanagementTool,
  deletemanagementTool
};

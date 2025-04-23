const managementToolSchema = require('./managementToolSchema');

const createManagementTool = async (req) => {
  const managementTool = new managementToolSchema(req.body);
  await managementTool.save();
  return managementTool;
};

const getAllmanagementTools = async () => {
    const managementTools = await managementToolSchema.find();
    return managementTools;
};

const getManagementTool = async (req) => {
  const managementToolId = req.params.managementToolId;
  const managementTool = await managementToolSchema.findById(managementToolId);
  return managementTool;
};

const deleteManagementTool = async (req) => {
  const managementToolId = req.params.managementToolId;
  await managementToolSchema.findByIdAndDelete(managementToolId);
};

module.exports = {
  createManagementTool,
  getAllmanagementTools,
  getManagementTool,
  deleteManagementTool
};

const { ManagementTool } = require('./managementToolSchema');
const { Activity } = require('./activitySchema');
const mongoose = require('mongoose');


/**
 * Trae todas las herramientas de gestion
 */
const getManagementTools = async () => {
  return await ManagementTool.find().lean();
};

/**
 * Dado un ID de herramienta de gestión, trae las actividades asociadas
 * @param {string} mtoolId
 */
const getActivitiesByManagementTool = async (mtoolId) => {
  return await Activity.find({ managementToolId: new mongoose.Types.ObjectId(mtoolId) }).lean();
};

module.exports = {
  getManagementTools,
  getActivitiesByManagementTool
};

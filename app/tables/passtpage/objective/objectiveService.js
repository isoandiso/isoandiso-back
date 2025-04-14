const { GeneralObjective } = require('./generalObjectiveSchema');
const { SpecificObjective } = require('./specificObjectiveSchema');
const { ManagementTool } = require('./managementToolSchema');
const { Activity } = require('./activitySchema');

/**
 * Trae todos los objetivos generales
 */
const getallGeneralObje = async () => {
  return await GeneralObjective.find().lean();
};

/**
 * Dado un ID de objetivo general, trae los objetivos específicos asociados
 * @param {string} generalObjectiveId
 */
const getSpecificObjectivesByGeneraln = async (generalObjectiveId) => {
  return await SpecificObjective.find({ generalObjectiveId }).lean();
};

/**
 * Dado un ID de objetivo específico, trae las herramientas de gestión asociadas
 * @param {string} specificObjectiveId
 */
const getManagementToolsBySpecific = async (specificObjectiveId) => {
  return await ManagementTool.find({ specificObjectiveId }).lean();
};

/**
 * Dado un ID de herramienta de gestión, trae las actividades asociadas
 * @param {string} managementToolId
 */
const getActivitiesByManagementTool = async (managementToolId) => {
  return await Activity.find({ managementToolId }).lean();
};

module.exports = {
  getallGeneralObje,
  getActivitiesByManagementTool,
  getManagementToolsBySpecific,
  getSpecificObjectivesByGeneraln
};

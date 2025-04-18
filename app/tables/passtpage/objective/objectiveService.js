const { GeneralObjective } = require('./generalObjectiveSchema');
const { SpecificObjective } = require('./specificObjectiveSchema');
const { ManagementTool } = require('./managementToolSchema');
const { Activity } = require('./activitySchema');
const mongoose = require('mongoose');

/**
 * Trae todos los objetivos generales
 */
const getallGeneralObje = async () => {
  return await GeneralObjective.find();
};

/**
 * Dado un ID de objetivo general, trae los objetivos específicos asociados
 * @param {string} generalObjectiveId
 */
const getSpecificObjectivesByGeneral = async (generalObjectiveId) => {
  return await SpecificObjective.find({
    generalObjectiveId: new mongoose.Types.ObjectId(generalObjectiveId)
  }).lean();
};

/**
 * Dado un ID de objetivo específico, trae las herramientas de gestión asociadas
 * @param {string} specificObjectiveId
 */
const getManagementToolsBySpecific = async (specificObjectiveId) => {
  return await ManagementTool.find({ specificObjectiveId: new mongoose.Types.ObjectId(specificObjectiveId)}).lean();
};

/**
 * Dado un ID de herramienta de gestión, trae las actividades asociadas
 * @param {string} mtoolId
 */
const getActivitiesByManagementTool = async (mtoolId) => {
  return await Activity.find({ managementToolId: new mongoose.Types.ObjectId(mtoolId) }).lean();
};

module.exports = {
  getallGeneralObje,
  getActivitiesByManagementTool,
  getManagementToolsBySpecific,
  getSpecificObjectivesByGeneral
};

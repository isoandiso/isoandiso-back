const activityCompletionDateService = require('./activityCompletionDateService');

//Crear una nueva fecha de cumplimiento para la actividad
const createActivityComplianceDate = async (req, res) => {
  try {
    const activityCompletionDate = await activityCompletionDateService.createActivityComplianceDate(req);
    res.status(201).json(activityCompletionDate);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error creando la fecha cumplimiento actividad', error: error.message });
  }
};

//Obtener todas las fechas de cumplimiento de actividades
const getAllActivitiesComplianceDate = async (req, res) => {
  try {
    const activityCompletionDates = await activityCompletionDateService.getAllActivitiesComplianceDate();
    res.status(200).json(activityCompletionDates);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas las fechas cumplimiento de actividades', error: error.message });
  }
};

//Obtener una fecha de cumplimiento de actividad por ID
const getActivityComplianceDate = async (req, res) => {
  try {
    const activityCompletionDate = await activityCompletionDateService.getActivityComplianceDate(req);
    if (!activityCompletionDate) {
      return res.status(404).json({ message: 'Fecha cumplimiento actividad no encontrada' });
    }
    res.status(200).json(activityCompletionDate);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo la fecha cumplimiento actividad', error: error.message });
  }
};

//Eliminar una fecha de cumplimiento de actividad por ID
const deleteActivityComplianceDate = async (req, res) => {
  try {
    await activityCompletionDate.deleteActivityComplianceDate(req);
    res.status(200).json({ message: 'Fecha cumplimiento actividad eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando la fecha cumplimiento actividad', error: error.message });
  }
};

module.exports = {
  createActivityComplianceDate,
  getAllActivitiesComplianceDate,
  getActivityComplianceDate,
  deleteActivityComplianceDate
};
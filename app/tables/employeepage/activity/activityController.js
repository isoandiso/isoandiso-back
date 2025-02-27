const activityService = require('./activityService');

//Crear una nueva actividad
const createActivity = async (req, res) => {
  try {
    const activity = await activityService.createActivity(req);
    res.status(201).json(activity);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error creando la actividad', error: error.message });
  }
};

//Obtener todas las actividades
const getAllActivities = async (req, res) => {
  try {
    const activities = await activityService.getAllActivities();
    res.status(200).json(activities);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas las actividades', error: error.message });
  }
};

//Obtener una actividad por ID
const getActivity = async (req, res) => {
  try {
    const activity = await activityService.getActivity(req);
    if (!activity) {
      return res.status(404).json({ message: 'Actividad no encontrada' });
    }
    res.status(200).json(activity);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo la actividad', error: error.message });
  }
};

//Eliminar una actividad por ID
const deleteActivity = async (req, res) => {
  try {
    await activityService.deleteActivity(req);
    res.status(200).json({ message: 'Actividad eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando la actividad', error: error.message });
  }
};

module.exports = {
  createActivity,
  getAllActivities,
  getActivity,
  deleteActivity,
};
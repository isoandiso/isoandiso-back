const generalObjectiveService = require('./generalObjectiveService');

const createGeneralObjective = async (req, res) => {
  try {
    const generalObjective = await generalObjectiveService.createGeneralObjective(req);
    res.status(201).json(generalObjective);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando el objetivo general', error: error.message });
  }
};

const getAllGeneralObjectives = async (req, res) => {
  try {
    const generalObjectives = await generalObjectiveService.getAllGeneralObjectives();
    res.status(200).json(generalObjectives);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todos los objetivos generales', error: error.message });
  }
};

const getGeneralObjective = async (req, res) => {
  try {
    const generalObjective = await generalObjectiveService.getGeneralObjective(req);
    if (!generalObjective) {
      return res.status(404).json({ message: 'Objetivo general no encontrado' });
    }
    res.status(200).json(generalObjective);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el objetivo general', error: error.message });
  }
};

const deleteGeneralObjective = async (req, res) => {
  try {
    await generalObjectiveService.deleteGeneralObjective(req);
    res.status(200).json({ message: 'Objetivo general eliminado satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando el objetivo general', error: error.message });
  }
};

module.exports = {
  createGeneralObjective,
  getAllGeneralObjectives,
  getGeneralObjective,
  deleteGeneralObjective
};
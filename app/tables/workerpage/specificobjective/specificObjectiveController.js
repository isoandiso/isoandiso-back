const generalObjectiveService = require('./specificObjectiveService');

const createSpecificObjective = async (req, res) => {
  try {
    const generalObjective = await generalObjectiveService.createSpecificObjective(req);
    res.status(201).json(generalObjective);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando el objetivo específico', error: error.message });
  }
};

const getAllSpecificObjectives = async (req, res) => {
  try {
    const generalObjectives = await generalObjectiveService.getAllSpecificObjectives();
    res.status(200).json(generalObjectives);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todos los objetivos específicos', error: error.message });
  }
};

const getSpecificObjective = async (req, res) => {
  try {
    const generalObjective = await generalObjectiveService.getSpecificObjective(req);
    if (!generalObjective) {
      return res.status(404).json({ message: 'Objetivo específico no encontrado' });
    }
    res.status(200).json(generalObjective);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el objetivo específico', error: error.message });
  }
};

const deleteSpecificObjective = async (req, res) => {
  try {
    await generalObjectiveService.deleteSpecificObjective(req);
    res.status(200).json({ message: 'Objetivo específico eliminado satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando el objetivo específico', error: error.message });
  }
};

module.exports = {
  createSpecificObjective,
  getAllSpecificObjectives,
  getSpecificObjective,
  deleteSpecificObjective
};
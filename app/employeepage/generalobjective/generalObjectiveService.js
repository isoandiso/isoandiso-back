const GeneralObjective = require('./generalObjectiveSchema');

// Crear objetivo general
const createGeneralObjective = async (req, res) => {
  try {
    const generalObjective = await GeneralObjective.create(req.body);
    res.status(201).json(generalObjective);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando el objetivo general', error: error.message });
  }
};

// Obtener todos los objetivos generales
const getAllGeneralObjectives = async (req, res) => {
  try {
    const generalObjectives = await GeneralObjective.findAll();
    res.status(200).json(generalObjectives);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todos los objetivos generales', error: error.message });
  }
};

// Obtener objetivo general por ID
const getGeneralObjective = async (req, res) => {
  try {
    const generalObjectiveId = req.params.generalobjectiveid;
    const generalObjective = await GeneralObjective.findByPk(generalObjectiveId);
    if (!generalObjective) {
      return res.status(404).json({ message: 'Objetivo general no encontrado' });
    }
    res.status(200).json(generalObjective);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el objetivo general', error: error.message });
  }
};

// Eliminar objetivo general por ID
const deleteGeneralObjective = async (req, res) => {
  try {
    const generalObjectiveId = req.params.generalobjectiveid;
    await GeneralObjective.destroy({ where: { id: generalObjectiveId } });
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

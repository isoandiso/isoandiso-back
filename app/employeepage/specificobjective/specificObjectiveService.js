const SpecificObjective = require('./specificObjectiveSchema');

// Crear objetivo específico
const createSpecificObjective = async (req, res) => {
  try {
    const specificObjective = await SpecificObjective.create(req.body);
    res.status(201).json(specificObjective);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando el objetivo específico', error: error.message });
  }
};

// Obtener todos los objetivos específicos
const getAllSpecificObjectives = async (req, res) => {
  try {
    const specificObjectives = await SpecificObjective.findAll();
    res.status(200).json(specificObjectives);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todos los objetivos específicos', error: error.message });
  }
};

// Obtener objetivo específico por ID
const getSpecificObjective = async (req, res) => {
  try {
    const specificObjectiveId = req.params.specificObjectiveId;
    const specificObjective = await SpecificObjective.findByPk(specificObjectiveId);
    if (!specificObjective) {
      return res.status(404).json({ message: 'Objetivo específico no encontrado' });
    }
    res.status(200).json(specificObjective);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el objetivo específico', error: error.message });
  }
};

// Eliminar objetivo específico por ID
const deleteSpecificObjective = async (req, res) => {
  try {
    const specificObjectiveId = req.params.specificObjectiveId;
    await SpecificObjective.destroy({ where: { id: specificObjectiveId } });
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

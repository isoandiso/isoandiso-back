const subcompanyWorkerService = require('./subcompanyWorkerService');

//Crear trabajador para subempresa
const createSubcompanyWorker = async (req, res) => {
  try {
    const subcompanyWorker = await subcompanyWorkerService.createSubcompanyWorker(req);
    res.status(201).json(subcompanyWorker);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error creando al trabajador de la subempresa', error: error.message });
  }
};

//Obtener todos los trabajadores de las subempresas
const getAllSubcompanyWorkers = async (req, res) => {
  try {
    const subcompanyWorkers = await subcompanyWorkerService.getAllSubcompanyWorkers();
    res.status(200).json(subcompanyWorkers);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todos los trabajadores de las subempresas', error: error.message });
  }
};

//Obtener trabajador de subempresa por ID
const getSubcompanyWorker = async (req, res) => {
  try {
    const subcompanyWorker = await subcompanyWorkerService.getSubcompanyWorker(req);
    if (!subcompanyWorker) {
      return res.status(404).json({ message: 'Trabajador de subempresa no encontrado' });
    }
    res.status(200).json(subcompanyWorker);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo al trabajador de la subempresa', error: error.message });
  }
};

//Eliminar trabajador de subempresa por ID
const deleteSubcompanyWorker = async (req, res) => {
  try {
    await subcompanyWorkerService.deleteSubcompanyWorker(req);
    res.status(200).json({ message: 'Trabajador de subempresa eliminado satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando al trabajador de la subempresa', error: error.message });
  }
};

module.exports = {
  createSubcompanyWorker,
  getAllSubcompanyWorkers,
  getSubcompanyWorker,
  deleteSubcompanyWorker,
};
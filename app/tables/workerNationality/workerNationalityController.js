const workerNationalityService = require('./workerNationalityService');

// Crear nacionalidad de trabajador
const createWorkerNationality = async (req, res) => {
  try {
    const workerNationality = await workerNationalityService.createWorkerNationality(req);
    res.status(201).json(workerNationality);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando la nacionalidad de trabajador', error: error.message });
  }
};

// Obtener todas las nacionalidades de trabajador
const getAllWorkerNationalities = async (req, res) => {
  try {
    const workerNationalities = await workerNationalityService.getAllWorkerNationalities();
    res.status(200).json(workerNationalities);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas las nacionalidades de trabajador', error: error.message });
  }
};

module.exports = {
  createWorkerNationality,
  getAllWorkerNationalities,
};
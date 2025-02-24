const companySiteService = require('./companySiteService');

// Crear sede
const createCompanySite = async (req, res) => {
  try {
    const companySite = await companySiteService.createCompanySite(req);
    res.status(201).json(companySite);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando la sede de la empresa', error: error.message });
  }
};

// Obtener todas las sedes
const getAllCompanySites = async (req, res) => {
  try {
    const companySites = await companySiteService.getAllCompanySites();
    res.status(200).json(companySites);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas las sedes de las empresas', error: error.message });
  }
};

//Eliminar companySite por ID
const deleteCompanySite = async (req, res) => {
  try {
    await companySiteService.deleteCompanySite(req);
    res.status(200).json({ message: 'Sede de la empresa eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando la sede de la empresa', error: error.message });
  }
};

module.exports = {
  createCompanySite,
  getAllCompanySites,
  deleteCompanySite,
};
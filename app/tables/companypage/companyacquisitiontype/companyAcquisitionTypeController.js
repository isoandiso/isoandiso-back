const companyAcquisitionTypeService = require('./companyAcquisitionTypeService');

// Crear Tipo de Adquisición
const createCompanyAcquisitionType = async (req, res) => {
  try {
    const companyAcquisitionType = await companyAcquisitionTypeService.createCompanyAcquisitionType(req);
    res.status(201).json(companyAcquisitionType);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando el tipo de adquisición', error: error.message });
  }
};

// Obtener todos los Tipos de Adquisición
const getAllCompanyAcquisitionTypes = async (req, res) => {
  try {
    const companyAcquisitionTypes = await companyAcquisitionTypeService.getAllCompanyAcquisitionTypes();
    res.status(200).json(companyAcquisitionTypes);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todos los tipos de adquisiciones', error: error.message });
  }
};

module.exports = {
  createCompanyAcquisitionType,
  getAllCompanyAcquisitionTypes,
};
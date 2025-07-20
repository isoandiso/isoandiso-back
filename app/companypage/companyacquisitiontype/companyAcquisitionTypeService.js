const CompanyAcquisitionType = require('./companyAcquisitionTypeSchema');

// Crear Tipo de Adquisición
const createCompanyAcquisitionType = async (req, res) => {
  try {
    const { name } = req.body;
    const companyAcquisitionType = await CompanyAcquisitionType.create({ name });
    res.status(201).json(companyAcquisitionType);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando el tipo de adquisición', error: error.message });
  }
};

// Obtener todos los Tipos de Adquisición
const getAllCompanyAcquisitionTypes = async (req, res) => {
  try {
    const companyAcquisitionTypes = await CompanyAcquisitionType.findAll();
    res.status(200).json(companyAcquisitionTypes);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todos los tipos de adquisiciones', error: error.message });
  }
};

module.exports = {
  createCompanyAcquisitionType,
  getAllCompanyAcquisitionTypes,
};
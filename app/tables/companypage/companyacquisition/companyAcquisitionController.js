const companyAcquisitionService = require('./companyAcquisitionService');

//Crear adquisición
const createCompanyAcquisition = async (req, res) => {
  try {
    const companyAcquisition = await companyAcquisitionService.createCompanyAcquisition(req);
    res.status(201).json(companyAcquisition);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando la adquisición a la empresa', error: error.message });
  }
};

//Obtener todas las acquisitions
const getAllCompanyAcquisitions = async (req, res) => {
  try {
    const companyAcquisitions = await companyAcquisitionService.getAllCompanyAcquisitions();
    res.status(200).json(companyAcquisitions);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas las adquisiciones de las empresas', error: error.message });
  }
};

//Obtener adquisición por ID
const getCompanyAcquisition = async (req, res) => {
  try {
    const companyAcquisition = await companyAcquisitionService.getCompanyAcquisition(req);
    if (!companyAcquisition) {
      return res.status(404).json({ message: 'Adquisición de la empresa no encontrada' });
    }
    res.status(200).json(companyAcquisition);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo la adquisición de la empresa', error: error.message });
  }
};

//Eliminar adquisición por ID
const deleteCompanyAcquisition = async (req, res) => {
  try {
    await companyAcquisitionService.deleteCompanyAcquisition(req);
    res.status(200).json({ message: 'Adquisición de la empresa eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando la adquisición de la empresa', error: error.message });
  }
};

module.exports = {
  createCompanyAcquisition,
  getAllCompanyAcquisitions,
  getCompanyAcquisition,
  deleteCompanyAcquisition,
};
const CompanyAcquisition = require('./companyAcquisitionSchema');
const Iso = require('../iso/isoSchema');
const CompanyAcquisitionType = require('../companyacquisitiontype/companyAcquisitionTypeSchema');

// Crear adquisición
const createCompanyAcquisition = async (req, res) => {
  try {
    const { isoIds, ...acquisitionData } = req.body;
    const companyAcquisition = await CompanyAcquisition.create(acquisitionData);
    
    if (Array.isArray(isoIds) && isoIds.length > 0) {
      await companyAcquisition.setIsos(isoIds);
    }
    
    const result = await CompanyAcquisition.findByPk(companyAcquisition.id, {
      include: [
        { model: Iso, as: 'isos' },
        { model: CompanyAcquisitionType, as: 'acquisitionType' }
      ]
    });
    
    res.status(201).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando la adquisición a la empresa', error: error.message });
  }
};

// Obtener todas las acquisitions
const getAllCompanyAcquisitions = async (req, res) => {
  try {
    const companyAcquisitions = await CompanyAcquisition.findAll({
      include: [
        { model: Iso, as: 'isos' },
        { model: CompanyAcquisitionType, as: 'acquisitionType' }
      ]
    });
    res.status(200).json(companyAcquisitions);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas las adquisiciones de las empresas', error: error.message });
  }
};

// Obtener adquisición por ID
const getCompanyAcquisition = async (req, res) => {
  try {
    const companyAcquisitionId = req.params.companyAcquisitionId;
    const companyAcquisition = await CompanyAcquisition.findByPk(companyAcquisitionId, {
      include: [
        { model: Iso, as: 'isos' },
        { model: CompanyAcquisitionType, as: 'acquisitionType' }
      ]
    });
    
    if (!companyAcquisition) {
      return res.status(404).json({ message: 'Adquisición de la empresa no encontrada' });
    }
    
    res.status(200).json(companyAcquisition);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo la adquisición de la empresa', error: error.message });
  }
};

// Eliminar adquisición por ID
const deleteCompanyAcquisition = async (req, res) => {
  try {
    const companyAcquisitionId = req.params.companyAcquisitionId;
    const companyAcquisition = await CompanyAcquisition.findByPk(companyAcquisitionId);
    
    if (!companyAcquisition) {
      return res.status(404).json({ message: 'Adquisición de la empresa no encontrada' });
    }
    
    await companyAcquisition.destroy();
    res.status(200).json({ message: 'Adquisición de la empresa eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando la adquisición de la empresa', error: error.message });
  }
};

module.exports = {
  createCompanyAcquisition,
  getAllCompanyAcquisitions,
  getCompanyAcquisition,
  deleteCompanyAcquisition
};

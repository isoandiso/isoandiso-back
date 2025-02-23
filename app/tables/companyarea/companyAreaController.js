const companyAreaService = require('./companyAreaService');

//Crear área
const createCompanyArea = async (req, res) => {
  try {
    const companyArea = await companyAreaService.createCompanyArea(req);
    res.status(201).json(companyArea);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando el área de la empresa', error: error.message });
  }
};

//Obtener todas las áreas
const getAllCompanyAreas = async (req, res) => {
  try {
    const companyAreas = await companyAreaService.getAllCompanyAreas();
    res.status(200).json(companyAreas);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas las áreas de las empresas', error: error.message });
  }
};

//Obtener área por ID
const getCompanyArea = async (req, res) => {
  try {
    const companyArea = await companyAreaService.getCompanyArea(req);
    if (!companyArea) {
      return res.status(404).json({ message: 'Área de la empresa no encontrada' });
    }
    res.status(200).json(companyArea);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el área de la empresa', error: error.message });
  }
};

//Obtener el cargo de mayor jerarquía del área
const getChargeOfHigherHierarchyOfArea = async (req, res) => {
  try {
    const chargeOfHigherHierarchyOfArea = await companyAreaService.getChargeOfHigherHierarchyOfArea(req);
    res.status(200).json(chargeOfHigherHierarchyOfArea);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el cargo de mayor jerarquía del área de la empresa', error: error.message });
  }
};


//Eliminar área por ID
const deleteCompanyArea = async (req, res) => {
  try {
    await companyAreaService.deleteCompanyArea(req);
    res.status(200).json({ message: 'Área de la empresa eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando el área de la empresa', error: error.message });
  }
};

//Eliminar las isos del área
const deleteIsos = async (req, res) => {
  try {
    await companyAreaService.deleteIsos(req);
    res.status(200).json({ message: 'Las isos del área se eleminaron satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando las isos del área', error: error.message });
  }
};

//Eliminar el trabajador del área
const deleteWorker = async (req, res) => {
  try {
    await companyAreaService.deleteWorker(req);
    res.status(200).json({ message: 'El trabajador del área se eleminó satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando el trabajador del área', error: error.message });
  }
};

//Agregar isos al área
const addIso = async (req, res) => {
  try {
    await companyAreaService.addIso(req);
    res.status(200).json({ message: 'iso agregada al área correctamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error agregando la iso al área', error: error.message });
  }
};

//Actualizar el trabajador responsable del área
const updateResponsibleWorker = async (req, res) => {
  try {
    const companyArea = await companyAreaService.updateResponsibleWorker(req);
    res.status(200).json(companyArea);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error agregando el trabajador responsable del área', error: error.message });
  }
};

module.exports = {
  createCompanyArea,
  getAllCompanyAreas,
  getCompanyArea,
  getChargeOfHigherHierarchyOfArea,
  deleteCompanyArea,
  deleteIsos,
  deleteWorker,
  addIso,
  updateResponsibleWorker,
};
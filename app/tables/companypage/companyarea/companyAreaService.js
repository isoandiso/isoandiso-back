const companyAreaSchema = require('./companyAreaSchema');

const createCompanyArea = async (req) => {
  const companyArea = new companyAreaSchema(req.body);
  await companyArea.save();
  return companyArea;
};

const getAllCompanyAreas = async () => {
    const companyAreas = await companyAreaSchema.find();
    return companyAreas;
};

const getCompanyArea = async (req) => {
  const companyAreaId = req.params.id;
  const companyArea = await companyAreaSchema.findById(companyAreaId);
  return companyArea;
};

const getChargeOfHigherHierarchyOfArea = async (req) => {
  const companyAreaId = req.params.id;
  const companyArea = await companyAreaSchema.findById(companyAreaId);
  const chargeOfHigherHierarchyOfArea = companyArea.cargos[0];
  return chargeOfHigherHierarchyOfArea;
};

const deleteCompanyArea = async (req) => {
  const companyAreaId = req.params.id;
  await companyAreaSchema.findByIdAndDelete(companyAreaId);
};

const deleteIsos = async (req) => {
  const companyAreaId = req.params.id;
  const updatedArea = await companyAreaSchema.findByIdAndUpdate(
    companyAreaId,
    { $set: { isoIds: [] } },
    { new: true }
  );
  if (!updatedArea) {
    const error = new Error("Área de la empresa no encontrada");
    error.statusCode = 404;
    throw error;
  }
  return updatedArea;
};

const deleteEmployee = async (req) => {
  const companyAreaId = req.params.id;
  const updatedArea = await companyAreaSchema.findByIdAndUpdate(
    companyAreaId,
    { $set: { responsibleEmployeeId: null } },
    { new: true }
  );
  if (!updatedArea) {
    const error = new Error("Área de la empresa no encontrada");
    error.statusCode = 404;
    throw error;
  }
  return updatedArea;
};

const addIso = async (req) => {
  const companyAreaId = req.params.id;
  const { isoId } = req.body;
   // Verificar que isoId esté presente en la solicitud
   if (!isoId) {
    const error = new Error("El campo isoId es requerido");
    error.statusCode = 400;
    throw error;
  }
  const companyArea = await companyAreaSchema.findByIdAndUpdate(
    companyAreaId,
    { $addToSet: { isoIds: isoId } },
    { new: true }
  );
  if (!companyArea) {
    const error = new Error("Área de la empresa no encontrada");
    error.statusCode = 404;
    throw error;
  }
  return companyArea;
};

const updateResponsibleEmployee = async (req) => {
  const areaId = req.params.id;
  const { responsibleEmployeeId } = req.body;

  const area = await companyAreaSchema.findByIdAndUpdate(
    areaId,
    { $set: { responsibleEmployeeId: responsibleEmployeeId } },
    { new: true }
  );
  if (!area) {
    const error = new Error("Área de la empresa no encontrada");
    error.statusCode = 404;
    throw error;
  }
  return area;
};

module.exports = {
  createCompanyArea,
  getAllCompanyAreas,
  getCompanyArea,
  getChargeOfHigherHierarchyOfArea,
  deleteCompanyArea,
  deleteIsos,
  deleteEmployee,
  addIso,
  updateResponsibleEmployee
};

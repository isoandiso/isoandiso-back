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
  const areaId = req.params.areaId;
  const companyArea = await companyAreaSchema.findById(areaId);
  return companyArea;
};

const getChargeOfHigherHierarchyOfArea = async (req) => {
  const areaId = req.params.areaId;
  const companyArea = await companyAreaSchema.findById(areaId);
  const chargeOfHigherHierarchyOfArea = companyArea.cargos[0];
  return chargeOfHigherHierarchyOfArea;
};

const deleteCompanyArea = async (req) => {
  const areaId = req.params.areaId;

  /*eliminamos el área */
  await companyAreaSchema.findByIdAndDelete(areaId);
};

const deleteIsos = async (req) => {
  const areaId = req.params.areaId;
  const updatedArea = await companyAreaSchema.findByIdAndUpdate(
    areaId,
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
  const areaId = req.params.areaId;
  const employeeId = req.params.employeeId;

  /*eliminamos el empleado del área*/
  const area = await companyAreaSchema.findByIdAndUpdate(
    areaId,
    { $pull: { employeeIds: employeeId } },
    { new: true }
  );

  return area;
};

const addIso = async (req) => {
  const areaId = req.params.areaId;
  const isoId  = req.params.isoId;
   // Verificar que isoId esté presente en la solicitud
   if (!isoId) {
    const error = new Error("El campo isoId es requerido");
    error.statusCode = 400;
    throw error;
  }
  const companyArea = await companyAreaSchema.findByIdAndUpdate(
    areaId,
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

const addResponsibleEmployee = async (req) => {
  const areaId = req.params.areaId;
  const employeeId = req.params.employeeId;

  /*agregamos al empleado al área*/
  const area = await companyAreaSchema.findByIdAndUpdate(
    areaId,
    { $push: { employeeIds: employeeId } },
    { new: true }
  );

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
  addResponsibleEmployee
};

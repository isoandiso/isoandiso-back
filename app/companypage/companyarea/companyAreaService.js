const companyAreaSchema = require('./companyAreaSchema');
const employeeCompanyRegistrySchema = require('../../employeecompanyregistry/employeeCompanyRegistrySchema');

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
  const companyId = req.params.companyId;

  /*eliminamos el companyId dentro del campo companyIds de los empleados del registro de empleados que están dentro del área a eliminar */
  const area = await companyAreaSchema.findById(areaId).populate('responsibleEmployeeIds');
  await Promise.all(
    area.responsibleEmployeeIds.map(async (employee) => {
      await employeeCompanyRegistrySchema.findOneAndUpdate(
        { employeeEmail: employee.email },
        { $pull: { companyIds: companyId } }
      );
    })
  );

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
  const employeeEmail = req.params.employeeEmail;
  const companyId = req.params.companyId;

  /*eliminamos el empleado del área*/
  const area = await companyAreaSchema.findByIdAndUpdate(
    areaId,
    { $pull: { responsibleEmployeeIds: employeeId } },
    { new: true }
  );

  /*eliminamos el companyId del empleado del registro de empleados*/
  await employeeCompanyRegistrySchema.findOneAndUpdate(
    { employeeEmail: employeeEmail },
    { $pull: { companyIds:companyId } },
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
  const employeeEmail = req.params.employeeEmail;
  const companyId = req.params.companyId;

  /*agegamos al empleado al área*/
  const area = await companyAreaSchema.findByIdAndUpdate(
    areaId,
    { $push: { responsibleEmployeeIds: employeeId } },
    { new: true }
  );

  /*agregamos el companyId al empleado del registro de empleados*/
  await employeeCompanyRegistrySchema.findOneAndUpdate(
    { employeeEmail: employeeEmail },
    { $addToSet: { companyIds: companyId } },
    { new: true, upsert: true }
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

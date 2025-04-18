const employeeCompanyRegistrySchema = require('./employeeCompanyRegistrySchema');

const create = async (req) => {
  const employeeCompanyRegistry = new employeeCompanyRegistrySchema(req.body);
  await employeeCompanyRegistry.save();
  return employeeCompanyRegistry;
};

const getCompaniesOfEmployee = async (req) => {
  const employeeEmail = req.params.employeeEmail;

  // Obtención del registro referete al empleado
  const employeeCompanyRegistry = await employeeCompanyRegistrySchema.findOne({ employeeEmail: employeeEmail });
  if (!employeeCompanyRegistry) {
    return null;
  }
  // Obtención de los Ids de las compañias del empleado
  const companyIds = employeeCompanyRegistry.companyIds;
  if (!companyIds || companyIds.length === 0) {
    return [];
  }
  // Obtención y retorno de las compañias del empleado
  const companies = await mongoose.model('company').find({ _id: { $in: companyIds } });
  return companies;
};

const putCompanyToEmployee = async (req) => {
  const companyId = req.params.companyId;
  const employeeEmail = req.params.employeeEmail;

  // Obtención del registro referente al empleado
  const employeeCompanyRegistry = await employeeCompanyRegistrySchema.findOne({ employeeEmail: employeeEmail });
  if (!employeeCompanyRegistry) {
    return null;
  }
  // Verificación de que realmente existe la compañía a agregar
  const companyExists = await mongoose.model('company').exists({ _id: companyId });
  if (!companyExists) {
    return null;
  }
  // Verificamos si la compañía ya está en el registro referente al empleado
  if (employeeCompanyRegistry.companyIds.includes(companyId)) {
    return null;
  }
  // Añadimos el id de la compañía (en string) al array companyIds del registro del empleado y se retorna el registro 
  employeeCompanyRegistry.companyIds.push(companyId);
  await employeeCompanyRegistry.save();
  return employeeCompanyRegistry;
};

module.exports = {
  create,
  getCompaniesOfEmployee,
  putCompanyToEmployee
};
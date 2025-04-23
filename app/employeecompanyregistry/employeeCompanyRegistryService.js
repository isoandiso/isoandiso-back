const employeeCompanyRegistrySchema = require('./employeeCompanyRegistrySchema');
const companySchema = require('../companypage/company/companySchema');

const getCompaniesOfEmployee = async (req) => {
  const employeeEmail = req.params.employeeEmail;

  //obtenemos el registro del empleado
  const employeeCompanyRegistry = await employeeCompanyRegistrySchema.findOne({ employeeEmail: employeeEmail });
  if (!employeeCompanyRegistry) {
    return null;
  }
  //obtenemos los Ids de las compañias del empleado
  const companyIds = employeeCompanyRegistry.companyIds;
  if (!companyIds || companyIds.length === 0) {
    return [];
  }
  //obtenemos y retornamos las compañias del empleado
  const companies = await companySchema.find({ _id: { $in: companyIds } });
  return companies;
};

module.exports = {
  getCompaniesOfEmployee,
};
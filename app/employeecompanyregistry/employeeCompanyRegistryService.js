const EmployeeCompanyRegistry = require('./employeeCompanyRegistrySchema');
const Company = require('../companypage/company/companySchema');

const getCompaniesOfEmployee = async (req, res) => {
  try {
    const employeeEmail = req.params.employeeEmail;

    // Obtenemos el registro del empleado
    const employeeCompanyRegistry = await EmployeeCompanyRegistry.findOne({ 
      where: { employeeEmail: employeeEmail } 
    });
    
    if (!employeeCompanyRegistry) {
      return res.status(404).json({ message: 'No se encontró el registro del empleado' });
    }
    
    // Obtenemos los IDs de las compañías del empleado
    const companyIds = employeeCompanyRegistry.companyIds;
    if (!companyIds || companyIds.length === 0) {
      return res.status(200).json([]);
    }
    
    // Obtenemos y retornamos las compañías del empleado
    const companies = await Company.findAll({
      where: { id: companyIds }
    });
    
    res.status(200).json(companies);
  } catch (error) {
    res.status(error.statusCode || 500).json({ 
      message: 'Error obteniendo las compañías del empleado', 
      error: error.message 
    });
  }
};

module.exports = {
  getCompaniesOfEmployee,
};
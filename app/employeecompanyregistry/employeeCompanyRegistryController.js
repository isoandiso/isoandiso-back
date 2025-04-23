const employeeCompanyRegistryService = require('./employeeCompanyRegistryService');

const getCompaniesOfEmployee = async (req, res) => {
  try {
    const companies = await employeeCompanyRegistryService.getCompaniesOfEmployee(req);
    if(!companies){
      res.status(404).json({message: "No se encontró el empleado con dicho mail o el empleado no está asociado a ninguna compañía"});
    }else{
      res.status(200).json(companies);
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo las compañias del registro del empleado', error: error.message });
  }
};

module.exports = {
  getCompaniesOfEmployee,
};
const employeeCompanyRegistryService = require('./employeeCompanyRegistryService');

const create = async (req, res) => {
  try {
    const employeeCompanyRegistry = await employeeCompanyRegistryService.create(req);
    res.status(201).json(employeeCompanyRegistry);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error al crear el registro del empleado', error: error.message });
  }
};

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

const putCompanyToEmployee = async (req, res) => {
  try {
    const employeeCompanyRegistry = await employeeCompanyRegistryService.putCompanyToEmployee(req);
    if(!employeeCompanyRegistry){
      res.status(404).json({message: "No se encontró el empleado con dicho mail o ya está la compañia añadida al empleado o la compañia no existe"});
    }else{
      res.status(200).json(employeeCompanyRegistry);
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error al querer agregar la compañia al registro del empleado', error: error.message });
  }
};


module.exports = {
  create,
  getCompaniesOfEmployee,
  putCompanyToEmployee,
};
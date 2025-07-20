const CompanyArea = require('./companyAreaSchema');
const Iso = require('../iso/isoSchema');
const Employee = require('../../employeepage/employee/employeeSchema');
const Company = require('../company/companySchema');
const EmployeeCompanyRegistry = require('../../employeecompanyregistry/employeeCompanyRegistrySchema');

// Crear área
const createCompanyArea = async (req, res) => {
  try {
    const { isoIds, employeeIds, ...areaData } = req.body;
    const companyArea = await CompanyArea.create(areaData);
    
    if (Array.isArray(isoIds) && isoIds.length > 0) {
      await companyArea.setIsos(isoIds);
    }
    
    if (Array.isArray(employeeIds) && employeeIds.length > 0) {
      await companyArea.setEmployees(employeeIds);
      
      // Actualizar EmployeeCompanyRegistry
      if (companyArea.companyId) {
        const employees = await Employee.findAll({
          where: { id: employeeIds }
        });
        
        await Promise.all(
          employees.map(async (employee) => {
            let registry = await EmployeeCompanyRegistry.findOne({
              where: { employeeEmail: employee.email }
            });
            
            if (!registry) {
              registry = await EmployeeCompanyRegistry.create({
                employeeEmail: employee.email,
                companyIds: [companyArea.companyId]
              });
            } else {
              const companyIds = registry.companyIds || [];
              if (!companyIds.includes(companyArea.companyId)) {
                companyIds.push(companyArea.companyId);
                await registry.update({ companyIds });
              }
            }
          })
        );
      }
    }
    
    const result = await CompanyArea.findByPk(companyArea.id, {
      include: [
        { model: Iso, as: 'isos' },
        { model: Employee, as: 'employees' },
        { model: Company, as: 'company' }
      ]
    });
    
    res.status(201).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando el área de la empresa', error: error.message });
  }
};

// Obtener todas las áreas
const getAllCompanyAreas = async (req, res) => {
  try {
    const companyAreas = await CompanyArea.findAll({
      include: [
        { model: Iso, as: 'isos' },
        { model: Employee, as: 'employees' },
        { model: Company, as: 'company' }
      ]
    });
    res.status(200).json(companyAreas);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas las áreas de las empresas', error: error.message });
  }
};

// Obtener área por ID
const getCompanyArea = async (req, res) => {
  try {
    const areaId = req.params.areaId;
    const companyArea = await CompanyArea.findByPk(areaId, {
      include: [
        { model: Iso, as: 'isos' },
        { model: Employee, as: 'employees' },
        { model: Company, as: 'company' }
      ]
    });
    
    if (!companyArea) {
      return res.status(404).json({ message: 'Área de la empresa no encontrada' });
    }
    
    res.status(200).json(companyArea);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el área de la empresa', error: error.message });
  }
};

// Obtener el cargo de mayor jerarquía del área
const getChargeOfHigherHierarchyOfArea = async (req, res) => {
  try {
    const areaId = req.params.areaId;
    const companyArea = await CompanyArea.findByPk(areaId);
    
    if (!companyArea) {
      return res.status(404).json({ message: 'Área de la empresa no encontrada' });
    }
    
    const charges = companyArea.charges || [];
    const chargeOfHigherHierarchyOfArea = charges[0] || null;
    
    res.status(200).json(chargeOfHigherHierarchyOfArea);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el cargo de mayor jerarquía del área de la empresa', error: error.message });
  }
};

// Eliminar área por ID
const deleteCompanyArea = async (req, res) => {
  try {
    const areaId = req.params.areaId;
    const companyArea = await CompanyArea.findByPk(areaId);
    
    if (!companyArea) {
      return res.status(404).json({ message: 'Área de la empresa no encontrada' });
    }
    
    await companyArea.destroy();
    res.status(200).json({ message: 'Área de la empresa eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando el área de la empresa', error: error.message });
  }
};

// Eliminar las isos del área
const deleteIsos = async (req, res) => {
  try {
    const areaId = req.params.areaId;
    const companyArea = await CompanyArea.findByPk(areaId);
    
    if (!companyArea) {
      return res.status(404).json({ message: 'Área de la empresa no encontrada' });
    }
    
    await companyArea.setIsos([]);
    res.status(200).json({ message: 'Las isos del área se eliminaron satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando las isos del área', error: error.message });
  }
};

// Eliminar el trabajador del área
const deleteEmployee = async (req, res) => {
  try {
    const areaId = req.params.areaId;
    const employeeId = req.params.employeeId;
    
    const companyArea = await CompanyArea.findByPk(areaId);
    if (!companyArea) {
      return res.status(404).json({ message: 'Área de la empresa no encontrada' });
    }
    
    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    
    await companyArea.removeEmployee(employee);
    
    // Actualizar EmployeeCompanyRegistry
    if (companyArea.companyId) {
      const registry = await EmployeeCompanyRegistry.findOne({
        where: { employeeEmail: employee.email }
      });
      
      if (registry && registry.companyIds) {
        const updatedCompanyIds = registry.companyIds.filter(id => id !== companyArea.companyId);
        await registry.update({ companyIds: updatedCompanyIds });
      }
    }
    
    res.status(200).json({ message: 'El trabajador del área se eliminó satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando el trabajador del área', error: error.message });
  }
};

// Agregar isos al área
const addIso = async (req, res) => {
  try {
    const areaId = req.params.areaId;
    const isoId = req.params.isoId;
    
    if (!isoId) {
      return res.status(400).json({ message: 'El campo isoId es requerido' });
    }
    
    const companyArea = await CompanyArea.findByPk(areaId);
    if (!companyArea) {
      return res.status(404).json({ message: 'Área de la empresa no encontrada' });
    }
    
    const iso = await Iso.findByPk(isoId);
    if (!iso) {
      return res.status(404).json({ message: 'ISO no encontrada' });
    }
    
    await companyArea.addIso(iso);
    res.status(200).json({ message: 'ISO agregada al área correctamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error agregando la ISO al área', error: error.message });
  }
};

// Actualizar el trabajador responsable del área
const addResponsibleEmployee = async (req, res) => {
  try {
    const areaId = req.params.areaId;
    const employeeId = req.params.employeeId;
    
    const companyArea = await CompanyArea.findByPk(areaId);
    if (!companyArea) {
      return res.status(404).json({ message: 'Área de la empresa no encontrada' });
    }
    
    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    
    await companyArea.addEmployee(employee);
    
    // Actualizar EmployeeCompanyRegistry
    if (companyArea.companyId) {
      let registry = await EmployeeCompanyRegistry.findOne({
        where: { employeeEmail: employee.email }
      });
      
      if (!registry) {
        registry = await EmployeeCompanyRegistry.create({
          employeeEmail: employee.email,
          companyIds: [companyArea.companyId]
        });
      } else {
        const companyIds = registry.companyIds || [];
        if (!companyIds.includes(companyArea.companyId)) {
          companyIds.push(companyArea.companyId);
          await registry.update({ companyIds });
        }
      }
    }
    
    const result = await CompanyArea.findByPk(areaId, {
      include: [
        { model: Iso, as: 'isos' },
        { model: Employee, as: 'employees' },
        { model: Company, as: 'company' }
      ]
    });
    
    res.status(200).json(result);
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
  deleteEmployee,
  addIso,
  addResponsibleEmployee
};

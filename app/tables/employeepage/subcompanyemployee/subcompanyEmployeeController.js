const subcompanyEmployeeService = require('./subcompanyEmployeeService');

//Crear trabajador para subempresa
const createSubcompanyEmployee = async (req, res) => {
  try {
    const subcompanyEmployee = await subcompanyEmployeeService.createSubcompanyEmployee(req);
    res.status(201).json(subcompanyEmployee);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error creando al trabajador de la subempresa', error: error.message });
  }
};

//Obtener todos los trabajadores de las subempresas
const getAllSubcompanyEmployees = async (req, res) => {
  try {
    const subcompanyEmployees = await subcompanyEmployeeService.getAllSubcompanyEmployees();
    res.status(200).json(subcompanyEmployees);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todos los trabajadores de las subempresas', error: error.message });
  }
};

//Obtener trabajador de subempresa por ID
const getSubcompanyEmployee = async (req, res) => {
  try {
    const subcompanyEmployee = await subcompanyEmployeeService.getSubcompanyEmployee(req);
    if (!subcompanyEmployee) {
      return res.status(404).json({ message: 'Trabajador de subempresa no encontrado' });
    }
    res.status(200).json(subcompanyEmployee);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo al trabajador de la subempresa', error: error.message });
  }
};

//Eliminar trabajador de subempresa por ID
const deleteSubcompanyEmployee = async (req, res) => {
  try {
    await subcompanyEmployeeService.deleteSubcompanyEmployee(req);
    res.status(200).json({ message: 'Trabajador de subempresa eliminado satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando al trabajador de la subempresa', error: error.message });
  }
};

module.exports = {
  createSubcompanyEmployee,
  getAllSubcompanyEmployees,
  getSubcompanyEmployee,
  deleteSubcompanyEmployee,
};
const SubcompanyEmployee = require('./subcompanyEmployeeSchema');

// Crear trabajador para subempresa
const createSubcompanyEmployee = async (req, res) => {
  try {
    const subcompanyEmployee = await SubcompanyEmployee.create(req.body);
    res.status(201).json(subcompanyEmployee);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error creando al trabajador de la subempresa', error: error.message });
  }
};

// Obtener todos los trabajadores de las subempresas
const getAllSubcompanyEmployees = async (req, res) => {
  try {
    const subcompanyEmployees = await SubcompanyEmployee.findAll();
    res.status(200).json(subcompanyEmployees);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todos los trabajadores de las subempresas', error: error.message });
  }
};

// Obtener trabajador de subempresa por ID
const getSubcompanyEmployee = async (req, res) => {
  try {
    const subcompanyEmployeeId = req.params.subcompanyEmployeeId;
    const subcompanyEmployee = await SubcompanyEmployee.findByPk(subcompanyEmployeeId);
    if (!subcompanyEmployee) {
      return res.status(404).json({ message: 'Trabajador de subempresa no encontrado' });
    }
    res.status(200).json(subcompanyEmployee);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo al trabajador de la subempresa', error: error.message });
  }
};

// Eliminar trabajador de subempresa por ID
const deleteSubcompanyEmployee = async (req, res) => {
  try {
    const subcompanyEmployeeId = req.params.subcompanyEmployeeId;
    await SubcompanyEmployee.destroy({ where: { id: subcompanyEmployeeId } });
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

const EmployeeNationality = require('./employeeNationalitySchema');

// Crear nacionalidad de trabajador
const createEmployeeNationality = async (req, res) => {
  try {
    const employeeNationality = await EmployeeNationality.create(req.body);
    res.status(201).json(employeeNationality);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando la nacionalidad de trabajador', error: error.message });
  }
};

// Obtener todas las nacionalidades de trabajador
const getAllEmployeeNationalities = async (req, res) => {
  try {
    const employeeNationalities = await EmployeeNationality.findAll();
    res.status(200).json(employeeNationalities);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas las nacionalidades de trabajador', error: error.message });
  }
};

module.exports = {
  createEmployeeNationality,
  getAllEmployeeNationalities,
};
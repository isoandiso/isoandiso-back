const rolService = require('./rolService');

//Crear Rol
const createRol = async (req, res) => {
  try {
    const rol = await rolService.createRol(req);
    res.status(201).json(rol);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando el rol', error: error.message });
  }
};

//Obtener todos los Roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await rolService.getAllRoles();
    res.status(200).json(roles);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todos los roles', error: error.message });
  }
};

module.exports = {
  createRol,
  getAllRoles,
};
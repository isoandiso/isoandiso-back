const Rol = require('./rolSchema');

// Crear Rol
const createRol = async (req, res) => {
  try {
    const rol = await Rol.create(req.body);
    res.status(201).json(rol);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando el rol', error: error.message });
  }
};

// Obtener todos los Roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todos los roles', error: error.message });
  }
};

module.exports = {
  createRol,
  getAllRoles,
};
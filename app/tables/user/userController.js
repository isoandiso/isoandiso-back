const userService = require('./userService');

//Registro de usuario
const register = async (req, res) => {
  try {
    const { token, user } = await userService.register(req);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'None'
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando al usuario', error: error.message });
  }
};

//Login de usuario
const login = async (req, res) => {
  try {
    const { token, user } = await userService.login(req);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'None'
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error logeandose con el usuario', error: error.message });
  }
};

//Logout de usuario
const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Deslogeo del usuario satisfactorio' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error deslogeandose con el usuario', error: error.message });
  }
};

//Obtener perfil de usuario
const profile = async (req, res) => {
  try {
    const user = await userService.profile(req);
    res.status(200).json(user);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el perfil del usuario', error: error.message });
  }
};

//Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todos los usuarios', error: error.message });
  }
};

//Obtener usuario por ID
const getUser = async (req, res) => {
  try {
    const user = await userService.getUser(req);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el usuario', error: error.message });
  }
};

//Actualizar usuario por ID
const getUserupdateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req);
    res.status(200).json(user);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error actualizando el usuario', error: error.message });
  }
};

//Eliminar usuario por ID
const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req);
    res.status(200).json({ message: 'Usuario eliminado satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando el usuario', error: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  profile,
  getAllUsers,
  getUser,
  getUserupdateUser,
  deleteUser,
};
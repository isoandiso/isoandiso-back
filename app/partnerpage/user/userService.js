const User = require('./userSchema.js');
const bcrypt = require('bcryptjs');
const { createToken } = require('../../token.js');

// Registro de usuario
const register = async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body;
    const newUser = await User.create({ name, lastname, email, password });
    const userObject = newUser.toJSON();
    delete userObject.password;
    const token = createToken({ id: userObject.id });
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'None'
    });
    res.status(201).json(userObject);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando al usuario', error: error.message });
  }
};

// Login de usuario
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Algunos de los datos son incorrectos o no está registrado' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Algunos de los datos son incorrectos o no está registrado' });
    }
    const userObject = user.toJSON();
    delete userObject.password;
    const token = createToken({ id: userObject.id });
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'None'
    });
    res.status(200).json(userObject);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error logeandose con el usuario', error: error.message });
  }
};

// Logout de usuario
const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Deslogeo del usuario satisfactorio' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error deslogeandose con el usuario', error: error.message });
  }
};

// Obtener perfil de usuario
const profile = async (req, res) => {
  try {
    const user = await User.findByPk(req.profile.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const userObject = user.toJSON();
    delete userObject.password;
    res.status(200).json(userObject);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el perfil del usuario', error: error.message });
  }
};

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todos los usuarios', error: error.message });
  }
};

// Obtener usuario por ID
const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el usuario', error: error.message });
  }
};

// Actualizar usuario por ID
const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { password, ...userData } = req.body;
    if (password) {
      userData.password = password;
    }
    const [updatedRows, [updatedUser]] = await User.update(userData, {
      where: { id: userId },
      returning: true,
      individualHooks: true
    });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error actualizando el usuario', error: error.message });
  }
};

// Eliminar usuario por ID
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    await User.destroy({ where: { id: userId } });
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
  updateUser,
  deleteUser,
};

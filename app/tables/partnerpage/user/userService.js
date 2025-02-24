const userSchema = require('./userSchema.js');
const bcrypt = require('bcryptjs');
const { createToken } = require('../../../token.js');

//TOKEN

const register = async (req) => {
  const { name, lastname, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = new userSchema({ name, lastname, email, password: passwordHash });
  const userSaved = await newUser.save();
  const userObject = userSaved.toObject();
  delete userObject.password;
  const token = createToken({ id: userObject._id });
  return { token, user: userObject};
};

const login = async (req) => {
  const { email, password } = req.body;
  const user = await userSchema.findOne({ email });
  if (!user) {
    const error = new Error("Algunos de los datos son incorrectos o no está registrado");
    error.statusCode = 404;
    throw error;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Algunos de los datos son incorrectos o no está registrado");
    error.statusCode = 400;
    throw error;
  }
  const userObject = user.toObject();
  delete userObject.password;
  const token = createToken({ id: userObject._id });
  return { token, user: userObject };
};

const profile = async (req) => {
  const user = await userSchema.findById(req.profile.id);
  if (!user) {
    const error = new Error("Usuario no encontrado");
    error.statusCode = 404;
    throw error;
  }
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

//COMMONS

const getAllUsers = async (req, res) => {
  const users = await userSchema.find();
  return users
};

const getUser = async (req, res) => {
  const userId = req.params.id;
  const user = await userSchema.findById(userId);
  return user;
};

const updateUser = async (req) => {
  const { password, ...user } = req.body;
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }
  const userFinded = await userSchema.findByIdAndUpdate(
    req.params.id,
    { $set: user },
    { new: true }
  );
  if (!userFinded) {
    const error = new Error("Usuario no encontrado");
    error.statusCode = 404;
    throw error;
  }
  return userFinded;
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  await userSchema.findByIdAndDelete(userId);
};

module.exports = {
  register,
  login,
  profile,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser
};

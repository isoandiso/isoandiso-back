const workerSchema = require('./workerSchema.js');
const bcrypt = require('bcryptjs');
const { createToken } = require('../../token.js');

//TOKEN

/*
(el trabajador ya se habrá creado antes desde la vista de asignación de responsable digital de la parte de "Adquisiciones" con todos los campos exceptuando los campos "nombre","apellido"
 y "contraseña", los cuales se asignarán acá desde la página de trabajadores)
*/
const register = async (req) => {
  const { email, name, lastname, password } = req.body;
  const worker = await workerSchema.findOne({ email });
  if (!worker) {
    const error = new Error("Trabajador no encontrado");
    error.statusCode = 404;
    throw error;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  worker.name = name;
  worker.lastname = lastname;
  worker.password = passwordHash;
  const updatedWorker = await worker.save();
  const workerObject = updatedWorker.toObject();
  delete workerObject.password;
  const token = createToken({ id: workerObject._id });
  return { token, worker: workerObject};
};

const login = async (req) => {
  const { email, password } = req.body;
  const workerFinded = await workerSchema.findOne({ email });
  if (!workerFinded) {
    const error = new Error("Algunos de los datos son incorrectos o no está registrado");
    error.statusCode = 404;
    throw error;
  }
  const isMatch = await bcrypt.compare(password, workerFinded.password);
  if (!isMatch) {
    const error = new Error("Algunos de los datos son incorrectos o no está registrado");
    error.statusCode = 400;
    throw error;
  }
  const token = createToken({ id: workerFinded._id });
  const workerObject = workerFinded.toObject();
  delete workerObject.password;
  return { token, worker: workerObject };
};

const profile = async (req) => {
  const workerFinded = await workerSchema.findById(req.profile.id);
  if (!workerFinded) {
    const error = new Error("Trabajador no encontrado");
    error.statusCode = 404;
    throw error;
  }
  const workerObject = workerFinded.toObject();
  delete workerObject.password;
  return workerObject;
};

//COMMONS

const getAllCompanyWorkers = async (req) => {
    const workers = await workerSchema.find();
    return workers
};

const getCompanyWorker = async (req) => {
  const workerId = req.params.id;
  const worker = await workerSchema.findById(workerId);
  return worker;
};

const getCompanyWorkerByEmail = async (req) => {
  const { email } = req.body;
  const worker = await workerSchema.findOne({ email });
  if (!worker) {
    const error = new Error("Trabajador no encontrado");
    error.statusCode = 404;
    throw error;
  }
  return worker;
};

const updateCompanyWorker = async (req) => {
  const { password, ...worker } = req.body;
  if (password) {
    worker.password = await bcrypt.hash(password, 10);
  }
  const workerFinded = await workerSchema.findByIdAndUpdate(
    req.params.id,
    { $set: worker },
    { new: true }
  );
  if (!workerFinded) {
    const error = new Error("Trabajador no encontrado");
    error.statusCode = 404;
    throw error;
  }
  return workerFinded;
};

const deleteCompanyWorker = async (req) => {
  const workerId = req.params.id;
  await workerSchema.findByIdAndDelete(workerId);
};

module.exports = {
  register,
  login,
  profile,
  getAllCompanyWorkers,
  getCompanyWorker,
  getCompanyWorkerByEmail,
  updateCompanyWorker,
  deleteCompanyWorker
};

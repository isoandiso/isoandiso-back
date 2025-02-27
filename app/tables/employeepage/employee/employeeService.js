const employeeSchema = require('./employeeSchema.js');
const bcrypt = require('bcryptjs');
const { createToken } = require('../../../token.js');

//TOKEN

/*
(el trabajador ya se habrá creado antes desde la vista de asignación de responsable digital de la parte de "Adquisiciones" con todos los campos exceptuando los campos "nombre","apellido"
 y "contraseña", los cuales se asignarán acá desde la página de trabajadores)
*/
const register = async (req) => {
  const { email, name, lastname, password } = req.body;
  const employee = await employeeSchema.findOne({ email });
  if (!employee) {
    const error = new Error("Trabajador no encontrado");
    error.statusCode = 404;
    throw error;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  employee.name = name;
  employee.lastname = lastname;
  employee.password = passwordHash;
  const updatedEmployee = await employee.save();
  const employeeObject = updatedEmployee.toObject();
  delete employeeObject.password;
  const token = createToken({ id: employeeObject._id });
  return { token, employee: employeeObject};
};

const login = async (req) => {
  const { email, password } = req.body;
  const employeeFinded = await employeeSchema.findOne({ email });
  if (!employeeFinded) {
    const error = new Error("Algunos de los datos son incorrectos o no está registrado");
    error.statusCode = 404;
    throw error;
  }
  const isMatch = await bcrypt.compare(password, employeeFinded.password);
  if (!isMatch) {
    const error = new Error("Algunos de los datos son incorrectos o no está registrado");
    error.statusCode = 400;
    throw error;
  }
  const token = createToken({ id: employeeFinded._id });
  const employeeObject = employeeFinded.toObject();
  delete employeeObject.password;
  return { token, employee: employeeObject };
};

const profile = async (req) => {
  const employeeFinded = await employeeSchema.findById(req.profile.id);
  if (!employeeFinded) {
    const error = new Error("Trabajador no encontrado");
    error.statusCode = 404;
    throw error;
  }
  const employeeObject = employeeFinded.toObject();
  delete employeeObject.password;
  return employeeObject;
};

//COMMONS

const getAllCompanyEmployees = async (req) => {
    const employees = await employeeSchema.find();
    return employees
};

const getCompanyEmployee = async (req) => {
  const employeeId = req.params.id;
  const employee = await employeeSchema.findById(employeeId);
  return employee;
};

const getCompanyEmployeeByEmail = async (req) => {
  const { email } = req.body;
  const employee = await employeeSchema.findOne({ email });
  if (!employee) {
    const error = new Error("Trabajador no encontrado");
    error.statusCode = 404;
    throw error;
  }
  return employee;
};

const updateCompanyEmployee = async (req) => {
  const { password, ...employee } = req.body;
  if (password) {
    employee.password = await bcrypt.hash(password, 10);
  }
  const employeeFinded = await employeeSchema.findByIdAndUpdate(
    req.params.id,
    { $set: employee },
    { new: true }
  );
  if (!employeeFinded) {
    const error = new Error("Trabajador no encontrado");
    error.statusCode = 404;
    throw error;
  }
  return employeeFinded;
};

const deleteCompanyEmployee = async (req) => {
  const employeeId = req.params.id;
  await employeeSchema.findByIdAndDelete(employeeId);
};

module.exports = {
  register,
  login,
  profile,
  getAllCompanyEmployees,
  getCompanyEmployee,
  getCompanyEmployeeByEmail,
  updateCompanyEmployee,
  deleteCompanyEmployee
};

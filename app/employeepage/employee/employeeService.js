const employeeSchema = require('./employeeSchema.js');
const bcrypt = require('bcryptjs');
const { createToken } = require('../../token.js');

//TOKEN

/*
(el trabajador ya se habrá creado antes desde la vista de asignación de responsable digital de la parte de "Adquisiciones" con todos los campos exceptuando los campos "nombre","apellido"
 y "contraseña", los cuales se asignarán acá desde la página de trabajadores)
*/
const register = async (req) => {
  const { email, name, password } = req.body;

  //si no se encontró el empleado con dicho email retornamos los datos con null
  const employee = await employeeSchema.findOne({ email });
  if (!employee) {
    return { token:null, employee: null };
  }else{
    employee.name = name;
    employee.password = password;
    const updatedEmployee = await employee.save();
    const employeeObject = updatedEmployee.toObject();
    delete employeeObject.password;
    const token = createToken({ id: employeeObject._id });
    return { token, employee: employeeObject};
  }
};

const login = async (req) => {
  const { email, password } = req.body;
  const employeeFinded = await employeeSchema.findOne({ email });
  
  //si no se encontró el empleado con dicho email o las contraseñas no coindiden retornamos los datos con null
  if (!employeeFinded | !(await bcrypt.compare(password, employeeFinded.password))) {
    return { token:null, employee: null };
  }
  //sino retornamos el token y el empleado
  else{
    const token = createToken({ id: employeeFinded._id });
    const employeeObject = employeeFinded.toObject();
    delete employeeObject.password;
    return { token, employee: employeeObject };
  }
};

const profile = async (req) => {
  const employeeFinded = await employeeSchema.findById(req.profile.id);
  if (!employeeFinded) {
    return null;
  }else{
    const employeeObject = employeeFinded.toObject();
    delete employeeObject.password;
    return employeeObject;
  }
};

//COMMONS

const getAllCompanyEmployees = async (req) => {
    const employees = await employeeSchema.find();
    return employees
};

const getCompanyEmployee = async (req) => {
  const employeeId = req.params.employeeId;
  const employee = await employeeSchema.findById(employeeId);
  return employee;
};

const getCompanyEmployeeByEmail = async (req) => {
  const email = req.params.email;
  const employee = await employeeSchema.findOne({ email });
  if (!employee) {
    return null;
  }
  return employee;
};

const updateCompanyEmployee = async (req) => {
  const employeeId = req.params.employeeId;
  const { password, ...employee } = req.body;
  if (password) {
    employee.password = password;
  }
  const employeeFinded = await employeeSchema.findByIdAndUpdate(
    employeeId,
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
  const employeeId = req.params.employeeId;

  /*eliminamos el empleado*/
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

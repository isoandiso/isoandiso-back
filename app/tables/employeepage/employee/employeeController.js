const employeeService = require('./employeeService');

//Registro de trabajador
/*
(el trabajador ya se habrá creado antes desde la vista de asignación de responsable digital de la parte de "Adquisiciones" con todos los campos exceptuando los campos "nombre","apellido"
 y "contraseña", los cuales se asignarán acá desde la página de trabajadores)
*/
const register = async (req, res) => {
  try {
    const { token, employee } = await employeeService.register(req);
    if(token === null){
      res.status(404).json({message: "No se encontró el empleado con dicho mail"});
    }else{
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'None'
      });
      res.status(200).json(employee);
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando al trabajador', error: error.message });
  }
};

//Inicio de sesión del trabajador
const login = async (req, res) => {
  try {
    const { token, employee } = await employeeService.login(req);
    if(token === null){
      res.status(404).json({message: "No se encontró el empleado con dicho mail o la contraseña no coincide"});
    }else{
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'None'
      });
      res.status(200).json(employee);
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error logeándose con el trabajador', error: error.message });
  }
};

//Cierre de sesión del trabajador
const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Deslogueo del trabajador satisfactorio' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error al desloguearse del trabajador', error: error.message });
  }
};

//Obtener perfil del trabajador
const profile = async (req, res) => {
  try {
    const employee = await employeeService.profile(req);
    if(!employee){
      res.status(404).json({message: "No se encontró el empleado con dicho ID"});
    }else{
      res.status(200).json(employee);
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error al obtener el perfil del trabajador', error: error.message });
  }
};

//Obtener todos los trabajadores de la empresa
const getAllCompanyEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getAllCompanyEmployees();
    res.status(200).json(employees);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todos los trabajadores', error: error.message });
  }
};

//Obtener trabajador por ID
const getCompanyEmployee = async (req, res) => {
  try {
    const employee = await employeeService.getCompanyEmployee(req);
    if (!employee) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el trabajador', error: error.message });
  }
};

//Obtener trabajador por email
const getCompanyEmployeeByEmail = async (req, res) => {
  try {
    const employee = await employeeService.getCompanyEmployeeByEmail(req);
    if(!employee){
      res.status(404).json({message: "No se encontró el empleado con dicho mail"});
    }else{
      res.status(200).json(employee);
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el trabajador', error: error.message });
  }
};

//Actualizar trabajador por ID
const updateCompanyEmployee = async (req, res) => {
  try {
    const employee = await employeeService.updateCompanyEmployee(req);
    res.status(200).json(employee);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error actualizando al trabajador', error: error.message });
  }
};

//Eliminar trabajador por ID
const deleteCompanyEmployee = async (req, res) => {
  try {
    await employeeService.deleteCompanyEmployee(req);
    res.status(200).json({ message: 'Trabajador eliminado satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando al trabajador', error: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  profile,
  getAllCompanyEmployees,
  getCompanyEmployee,
  getCompanyEmployeeByEmail,
  updateCompanyEmployee,
  deleteCompanyEmployee,
};
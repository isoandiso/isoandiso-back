const Employee = require('./employeeSchema.js');
const bcrypt = require('bcryptjs');
const { createToken } = require('../../token.js');

/*
(el trabajador ya se habrá creado antes desde la vista de asignación de responsable digital de la parte de "Adquisiciones" con todos los campos exceptuando los campos "nombre","apellido"
 y "contraseña", los cuales se llenarán acá desde la página de trabajadores)
*/
// Registro de trabajador
const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const employee = await Employee.findOne({ where: { email } });
    if (!employee) {
      return res.status(404).json({ message: 'No se encontró el empleado con dicho mail' });
    } else {
      employee.name = name;
      employee.password = password;
      await employee.save();
      const employeeObject = employee.toJSON();
      delete employeeObject.password;
      const token = createToken({ id: employeeObject.id });
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'None'
      });
      res.status(200).json(employeeObject);
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando al trabajador', error: error.message });
  }
};

// Inicio de sesión del trabajador
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ where: { email } });
    if (!employee || !(await bcrypt.compare(password, employee.password))) {
      return res.status(404).json({ message: 'No se encontró el empleado con dicho mail o la contraseña no coincide' });
    } else {
      const token = createToken({ id: employee.id });
      const employeeObject = employee.toJSON();
      delete employeeObject.password;
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'None'
      });
      res.status(200).json(employeeObject);
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error logeándose con el trabajador', error: error.message });
  }
};

// Cierre de sesión del trabajador
const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Deslogueo del trabajador satisfactorio' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error al desloguearse del trabajador', error: error.message });
  }
};

// Obtener perfil del trabajador
const profile = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.profile.id);
    if (!employee) {
      return res.status(404).json({ message: 'No se encontró el empleado con dicho ID' });
    } else {
      const employeeObject = employee.toJSON();
      delete employeeObject.password;
      res.status(200).json(employeeObject);
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error al obtener el perfil del trabajador', error: error.message });
  }
};

// Obtener todos los trabajadores de la empresa
const getAllCompanyEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.status(200).json(employees);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todos los trabajadores', error: error.message });
  }
};

// Obtener trabajador por ID
const getCompanyEmployee = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el trabajador', error: error.message });
  }
};

// Obtener trabajador por email
const getCompanyEmployeeByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const employee = await Employee.findOne({ where: { email } });
    if (!employee) {
      return res.status(404).json({ message: 'No se encontró el empleado con dicho mail' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el trabajador', error: error.message });
  }
};

// Actualizar trabajador por ID
const updateCompanyEmployee = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    const { password, ...employeeData } = req.body;
    if (password) {
      employeeData.password = password;
    }
    const [updatedRows, [updatedEmployee]] = await Employee.update(employeeData, {
      where: { id: employeeId },
      returning: true,
      individualHooks: true
    });
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Trabajador no encontrado' });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error actualizando al trabajador', error: error.message });
  }
};

// Eliminar trabajador por ID
const deleteCompanyEmployee = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    const employee = await Employee.findByPk(employeeId);
    
    if (!employee) {
      return res.status(404).json({ message: 'Trabajador no encontrado' });
    }
    
    await employee.destroy();
    res.status(200).json({ message: 'Trabajador eliminado satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando al trabajador', error: error.message });
  }
};

// Eliminar múltiples trabajadores
const deleteMultipleEmployees = async (req, res) => {
  try {
    const { employeeIds } = req.body;
    
    if (!Array.isArray(employeeIds) || employeeIds.length === 0) {
      return res.status(400).json({ message: 'Se debe proporcionar un array de IDs de empleados' });
    }
    
    const employees = await Employee.findAll({
      where: { id: employeeIds }
    });
    
    if (employees.length === 0) {
      return res.status(404).json({ message: 'No se encontraron empleados para eliminar' });
    }
    
    // Eliminar cada empleado individualmente para que se ejecuten los hooks
    for (const employee of employees) {
      await employee.destroy();
    }
    
    res.status(200).json({ 
      message: `${employees.length} trabajador(es) eliminado(s) satisfactoriamente` 
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando trabajadores', error: error.message });
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
  deleteMultipleEmployees
};

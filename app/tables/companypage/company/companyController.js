const companyService = require('./companyService');

//Crear empresa
const register = async (req, res) => {
  try {
    const { token, company } = await companyService.register(req);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'None'
    });
    res.status(201).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando a la empresa', error: error.message });
  }
};

//Iniciar sesión de empresa
const login = async (req, res) => {
  try {
    const { token, company } = await companyService.login(req);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'None'
    });
    res.status(200).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error logeándose con la empresa', error: error.message });
  }
};

//Cerrar sesión de empresa
const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Deslogeo de la empresa satisfactorio' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error deslogeándose con la empresa', error: error.message });
  }
};

//Obtener perfil de empresa
const profile = async (req, res) => {
  try {
    const company = await companyService.profile(req);
    res.status(200).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error al obtener el perfil de la empresa', error: error.message });
  }
};

//Obtener todas las empresas
const getAllCompanies = async (req, res) => {
  try {
    const companies = await companyService.getAllCompanies();
    res.status(200).json(companies);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas las empresas', error: error.message });
  }
};

//Obtener empresa por ID
const getCompany = async (req, res) => {
  try {
    const company = await companyService.getCompany(req);
    if (!company) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo la empresa', error: error.message });
  }
};

//Obtener el pais de la empresa por ID de la empresa
const getCompanyCountry = async (req, res) => {
  try {
    const companyCountry = await companyService.getCompanyCountry(req);
    res.status(200).json(companyCountry);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error al querer tomar el pais de la empresa', error: error.message });
  }
};

//Obtener las adquisiciones de la empresa por ID de la empresa
const getCompanyAcquisitions = async (req, res) => {
  try {
    const acquisitions = await companyService.getCompanyAcquisitions(req);
    res.status(200).json(acquisitions);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error al querer tomar las adquisiciones de la empresa', error: error.message });
  }
};

//Eliminar empresa por ID
const deleteCompany = async (req, res) => {
  try {
    await companyService.deleteCompany(req);
    res.status(200).json({ message: 'Empresa eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando la empresa', error: error.message });
  }
};

//Acualizar contraseña de la empresa por la empresa ID
const updatePassword = async (req, res) => {
  try {
    const company = await companyService.updatePassword(req, res);
    res.status(200).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error actualizando la contraseña de la empresa', error: error.message });
  }
};

//Acualizar país de la empresa por la empresa ID
const updateCountry = async (req, res) => {
  try {
    const companyCountry = await companyService.updateCountry(req, res);
    res.status(200).json(companyCountry);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error actualizando el pais de la empresa', error: error.message });
  }
};

//Acualizar ruc de la empresa por la empresa ID
const updateRuc = async (req, res) => {
  try {
    const company = await companyService.updateRuc(req, res);
    res.status(200).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error actualizando el ruc de la empresa', error: error.message });
  }
};

//Acualizar razón social de la empresa por la empresa ID
const updateSocialReason = async (req, res) => {
  try {
    const company = await companyService.updateSocialReason(req, res);
    res.status(200).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error actualizando la razón social de la empresa', error: error.message });
  }
};

//Acualizar la provincia de la empresa por la empresa ID
const updateProvince = async (req, res) => {
  try {
    const company = await companyService.updateProvince(req, res);
    res.status(200).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error actualizando la provincia de la empresa', error: error.message });
  }
};

//Acualizar la ciudad de la empresa por la empresa ID
const updateCity = async (req, res) => {
  try {
    const company = await companyService.updateCity(req, res);
    res.status(200).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error actualizando la ciudad de la empresa', error: error.message });
  }
};

//Acualizar la dirección de la empresa por la empresa ID
const updateAddress = async (req, res) => {
  try {
    const company = await companyService.updateAddress(req, res);
    res.status(200).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error actualizando la dirección de la empresa', error: error.message });
  }
};

//Acualizar la actividad económica de la empresa por la empresa ID
const updateEconomicActivity = async (req, res) => {
  try {
    const company = await companyService.updateEconomicActivity(req, res);
    res.status(200).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error actualizando la actividad económica de la empresa', error: error.message });
  }
};

//Acualizar el sector económico de la empresa por la empresa ID
const updateEconomicSector = async (req, res) => {
  try {
    const company = await companyService.updateEconomicSector(req, res);
    res.status(200).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error actualizando el sector económico de la empresa', error: error.message });
  }
};

//Acualizar el tamaño de la empresa por la empresa ID
const updateCompanySize = async (req, res) => {
  try {
    const company = await companyService.updateCompanySize(req, res);
    res.status(200).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error actualizando el tamaño de la empresa', error: error.message });
  }
};

//Agregar adquisición de la empresa por la empresa ID
const addAcquisition = async (req, res) => {
  try {
    const company = await companyService.addAcquisition(req, res);
    res.status(200).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error agregando la adquisición a la empresa', error: error.message });
  }
};

//Agregar sede a la empresa por la empresa ID
const addSite = async (req, res) => {
  try {
    const company = await companyService.addSite(req, res);
    res.status(200).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error agregando la sede a la empresa', error: error.message });
  }
};

//Agregar área a la empresa por la empresa ID
const addArea = async (req, res) => {
  try {
    const company = await companyService.addArea(req, res);
    res.status(200).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error agregando el área a la empresa', error: error.message });
  }
};

//Crear trabajador en la tabla trabajador
const createEmployee = async (req, res) => {
  try {
    const employee = await companyService.createEmployee(req);
    res.status(201).json(employee);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error creando el trabajador', error: error.message });
  }
};

module.exports = {
  createEmployee,
  register,
  login,
  logout,
  profile,
  getAllCompanies,
  getCompany,
  deleteCompany,
  getCompanyCountry,
  getCompanyAcquisitions,
  updatePassword,
  updateCountry,
  updateRuc,
  updateSocialReason,
  updateProvince,
  updateCity,
  updateAddress,
  updateEconomicActivity,
  updateEconomicSector,
  updateCompanySize,
  addAcquisition,
  addSite,
  addArea
};
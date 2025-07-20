const bcrypt = require('bcryptjs');
const Company = require('./companySchema.js');
const Employee = require('../../employeepage/employee/employeeSchema.js');
const CompanyCountry = require('../companycountry/companyCountrySchema');
const CompanyAcquisition = require('../companyacquisition/companyAcquisitionSchema');
const CompanySite = require('../companysite/companySiteSchema');
const CompanyArea = require('../companyarea/companyAreaSchema');
const { createToken } = require('../../token.js');

// Registro de empresa
const register = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    const company = await Company.create({ email, phone, password });
    const companyObject = company.toJSON();
    delete companyObject.password;
    const token = createToken({ id: companyObject.id });
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'None'
    });
    res.status(201).json(companyObject);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando a la empresa', error: error.message });
  }
};

// Inicio de sesión de empresa
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const company = await Company.findOne({
      where: { email },
      include: [
        {
          model: CompanyCountry,
          as: 'country',
          include: [{ model: require('../iso/isoSchema'), as: 'isos' }]
        },
        {
          model: CompanyAcquisition,
          as: 'acquisitions',
          include: [
            { model: require('../iso/isoSchema'), as: 'isos' },
            { model: require('../companyacquisitiontype/companyAcquisitionTypeSchema'), as: 'acquisitionType' }
          ]
        },
        {
          model: CompanySite,
          as: 'sites'
        },
        {
          model: CompanyArea,
          as: 'areas',
          include: [
            { model: require('../iso/isoSchema'), as: 'isos' },
            { model: require('../../employeepage/employee/employeeSchema'), as: 'employees' }
          ]
        }
      ]
    });

    if (!company) {
      return res.status(404).json({ message: 'Algunos de los datos son incorrectos o no está registrado' });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Algunos de los datos son incorrectos o no está registrado' });
    }

    const companyObject = company.toJSON();
    delete companyObject.password;
    const token = createToken({ id: company.id });
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'None'
    });
    res.status(200).json(companyObject);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error logeándose con la empresa', error: error.message });
  }
};

// Cierre de sesión de empresa
const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Deslogeo de la empresa satisfactorio' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error deslogeándose con la empresa', error: error.message });
  }
};

// Obtener perfil de empresa
const profile = async (req, res) => {
  try {
    const company = await Company.findByPk(req.profile.id, {
      include: [
        {
          model: CompanyCountry,
          as: 'country',
          include: [{ model: require('../iso/isoSchema'), as: 'isos' }]
        },
        {
          model: CompanyAcquisition,
          as: 'acquisitions',
          include: [
            { model: require('../iso/isoSchema'), as: 'isos' },
            { model: require('../companyacquisitiontype/companyAcquisitionTypeSchema'), as: 'acquisitionType' }
          ]
        },
        {
          model: CompanySite,
          as: 'sites'
        },
        {
          model: CompanyArea,
          as: 'areas',
          include: [
            { model: require('../iso/isoSchema'), as: 'isos' },
            { model: require('../../employeepage/employee/employeeSchema'), as: 'employees' }
          ]
        }
      ]
    });

    if (!company) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }

    const companyObject = company.toJSON();
    delete companyObject.password;
    res.status(200).json(companyObject);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error al obtener el perfil de la empresa', error: error.message });
  }
};

// Obtener todas las empresas
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.status(200).json(companies);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas las empresas', error: error.message });
  }
};

// Obtener empresa por ID
const getCompany = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const company = await Company.findByPk(companyId);
    
    if (!company) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }
    
    res.status(200).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo la empresa', error: error.message });
  }
};

// Eliminar empresa por ID
const deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const company = await Company.findByPk(companyId);
    
    if (!company) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }
    
    await company.destroy();
    res.status(200).json({ message: 'Empresa eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando la empresa', error: error.message });
  }
};

// Obtener el país de la empresa por ID de la empresa
const getCompanyCountry = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const company = await Company.findByPk(companyId, {
      include: [{ model: CompanyCountry, as: 'country' }]
    });
    
    if (!company) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }
    
    res.status(200).json(company.country);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error al querer tomar el pais de la empresa', error: error.message });
  }
};

// Obtener las adquisiciones de la empresa por ID de la empresa
const getCompanyAcquisitions = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const company = await Company.findByPk(companyId, {
      include: [{ model: CompanyAcquisition, as: 'acquisitions' }]
    });
    
    if (!company) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }
    
    res.status(200).json(company.acquisitions);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error al querer tomar las adquisiciones de la empresa', error: error.message });
  }
};

// Actualizar contraseña de la empresa por la empresa ID
const updatePassword = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'No hay password' });
    }

    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }

    company.password = password;
    await company.save();
    
    const companyObject = company.toJSON();
    delete companyObject.password;
    res.status(200).json(companyObject);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error actualizando la contraseña de la empresa', error: error.message });
  }
};

// Actualizar país de la empresa por la empresa ID
const updateCountry = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const countryId = req.params.countryId;

    if (!countryId) {
      return res.status(400).json({ message: 'El id país no está definido' });
    }

    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }

    company.countryId = countryId;
    await company.save();
    
    res.status(200).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error actualizando el pais de la empresa', error: error.message });
  }
};

// Actualizar RUC de la empresa por la empresa ID
const updateRuc = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const { ruc } = req.body;

    if (!ruc) {
      return res.status(400).json({ message: 'El ruc no está definido' });
    }

    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }

    company.ruc = ruc;
    await company.save();
    
    res.status(200).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error actualizando el ruc de la empresa', error: error.message });
  }
};

// Actualizar razón social de la empresa por la empresa ID
const updateSocialReason = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const { socialReason } = req.body;

    if (!socialReason) {
      return res.status(400).json({ message: 'La razón social no está definida' });
    }

    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }

    company.socialReason = socialReason;
    await company.save();
    
    res.status(200).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error actualizando la razón social de la empresa', error: error.message });
  }
};

// Actualizar la provincia de la empresa por la empresa ID
const updateProvince = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const { province } = req.body;

    if (!province) {
      return res.status(400).json({ message: 'La provincia no está definida' });
    }

    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }

    company.province = province;
    await company.save();
    
    res.status(200).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error actualizando la provincia de la empresa', error: error.message });
  }
};

// Actualizar la ciudad de la empresa por la empresa ID
const updateCity = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const { city } = req.body;

    if (!city) {
      return res.status(400).json({ message: 'La ciudad no está definida' });
    }

    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }

    company.city = city;
    await company.save();
    
    res.status(200).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error actualizando la ciudad de la empresa', error: error.message });
  }
};

// Actualizar la dirección de la empresa por la empresa ID
const updateAddress = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({ message: 'La dirección no está definida' });
    }

    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }

    company.address = address;
    await company.save();
    
    res.status(200).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error actualizando la dirección de la empresa', error: error.message });
  }
};

// Actualizar la actividad económica de la empresa por la empresa ID
const updateEconomicActivity = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const { economicActivity } = req.body;

    if (!economicActivity) {
      return res.status(400).json({ message: 'La actividad económica no está definida' });
    }

    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }

    company.economicActivity = economicActivity;
    await company.save();
    
    res.status(200).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error actualizando la actividad económica de la empresa', error: error.message });
  }
};

// Actualizar el sector económico de la empresa por la empresa ID
const updateEconomicSector = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const { economicSector } = req.body;

    if (!economicSector) {
      return res.status(400).json({ message: 'El sector económico no está definido' });
    }

    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }

    company.economicSector = economicSector;
    await company.save();
    
    res.status(200).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error actualizando el sector económico de la empresa', error: error.message });
  }
};

// Actualizar el tamaño de la empresa por la empresa ID
const updateCompanySize = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const { companySize } = req.body;

    if (!companySize) {
      return res.status(400).json({ message: 'El tamaño no está definido' });
    }

    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }

    company.companySize = companySize;
    await company.save();
    
    res.status(200).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error actualizando el tamaño de la empresa', error: error.message });
  }
};

// Agregar adquisición de la empresa por la empresa ID
const addAcquisition = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const acquisitionId = req.params.acquisitionId;

    if (!acquisitionId) {
      return res.status(400).json({ message: 'La nueva adquisición no está definida' });
    }

    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }

    const acquisition = await CompanyAcquisition.findByPk(acquisitionId);
    if (!acquisition) {
      return res.status(404).json({ message: 'Adquisición no encontrada' });
    }

    await company.addAcquisition(acquisition);
    
    const result = await Company.findByPk(companyId, {
      include: [{ model: CompanyAcquisition, as: 'acquisitions' }]
    });
    
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error agregando la adquisición a la empresa', error: error.message });
  }
};

// Agregar sede a la empresa por la empresa ID
const addSite = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const companySiteId = req.params.companySiteId;

    if (!companySiteId) {
      return res.status(400).json({ message: 'La nueva sede no está definida' });
    }

    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }

    const site = await CompanySite.findByPk(companySiteId);
    if (!site) {
      return res.status(404).json({ message: 'Sede no encontrada' });
    }

    await company.addSite(site);
    
    const result = await Company.findByPk(companyId, {
      include: [{ model: CompanySite, as: 'sites' }]
    });
    
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error agregando la sede a la empresa', error: error.message });
  }
};

// Agregar área a la empresa por la empresa ID
const addArea = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const companyAreaId = req.params.companyAreaId;

    if (!companyAreaId) {
      return res.status(400).json({ message: 'La nueva área no está definida' });
    }

    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }

    const area = await CompanyArea.findByPk(companyAreaId);
    if (!area) {
      return res.status(404).json({ message: 'Área no encontrada' });
    }

    await company.addArea(area);
    
    const result = await Company.findByPk(companyId, {
      include: [{ model: CompanyArea, as: 'areas' }]
    });
    
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error agregando el área a la empresa', error: error.message });
  }
};

// Crear trabajador en la tabla trabajador
const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
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
  getCompany,
  getAllCompanies,
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

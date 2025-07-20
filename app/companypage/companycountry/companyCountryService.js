const CompanyCountry = require('./companyCountrySchema');
const Iso = require('../iso/isoSchema');

// Crear País
const createCompanyCountry = async (req, res) => {
  try {
    const { name, isoIds } = req.body;
    const companyCountry = await CompanyCountry.create({ name });
    if (Array.isArray(isoIds) && isoIds.length > 0) {
      await companyCountry.setIsos(isoIds);
    }
    const result = await CompanyCountry.findByPk(companyCountry.id, { include: { model: Iso, as: 'isos' } });
    res.status(201).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando el país de la empresa', error: error.message });
  }
};

// Obtener todos los Países
const getAllCompanyCountries = async (req, res) => {
  try {
    const companyCountries = await CompanyCountry.findAll({ include: { model: Iso, as: 'isos' } });
    res.status(200).json(companyCountries);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todos los países de la empresa', error: error.message });
  }
};

// Obtener todas las isos del país ID
const getAllIsosOfCompanyCountry = async (req, res) => {
  try {
    const countryId = req.params.countryId;
    const companyCountry = await CompanyCountry.findByPk(countryId, { include: { model: Iso, as: 'isos' } });
    if (!companyCountry) {
      return res.status(404).json({ message: 'País no encontrado' });
    }
    res.status(200).json(companyCountry.isos);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas las isos del país de la empresa', error: error.message });
  }
};

// Obtener los countries con al menos una iso habilitada
const getAllCompanyCountriesWithIsos = async (req, res) => {
  try {
    const companyCountries = await CompanyCountry.findAll({
      include: {
        model: Iso,
        as: 'isos',
        required: true
      }
    });
    res.status(200).json(companyCountries);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todos los países con al menos una iso', error: error.message });
  }
};

module.exports = {
  createCompanyCountry,
  getAllCompanyCountries,
  getAllIsosOfCompanyCountry,
  getAllCompanyCountriesWithIsos
};
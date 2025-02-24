const companyCountryService = require('./companyCountryService');

//Crear País
const createCompanyCountry = async (req, res) => {
  try {
    const companyCountry = await companyCountryService.createCompanyCountry(req);
    res.status(201).json(companyCountry);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando el país de la empresa', error: error.message });
  }
};

//Obtener todos los Países
const getAllCompanyCountries = async (req, res) => {
  try {
    const companyCountries = await companyCountryService.getAllCompanyCountries();
    res.status(200).json(companyCountries);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todos los países de la empresa', error: error.message });
  }
};

//Obtener todas las isos del país ID
const getAllIsosOfCompanyCountry = async (req, res) => {
  try {
    const isos = await companyCountryService.getAllIsosOfCompanyCountry();
    res.status(200).json(isos);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas las isos del país de la empresa', error: error.message });
  }
};

//Obtener los countries con al menos una iso habilitadas
const getAllCompanyCountriesWithIsos = async (req, res) => {
  try {
    const companyCountries = await companyCountryService.getAllCompanyCountriesWithIsos();
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
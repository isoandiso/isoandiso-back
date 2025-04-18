const companyCountrySchema = require('./companyCountrySchema');

const createCompanyCountry = async (req) => {
  const companyCountry = new companyCountrySchema(req.body);
  await companyCountry.save();
  return companyCountry;
};

const getAllCompanyCountries = async () => {
    const companyCountries = await companyCountrySchema.find().populate('isoIds');
    return companyCountries;
};

const getAllIsosOfCompanyCountry = async (req) => {
  const countryId = req.params.id;
  const companyCountry = await companyCountrySchema.findById(countryId).populate('isoIds');
  const isos = companyCountry.isoIds
  return isos;
};

const getAllCompanyCountriesWithIsos = async () => {
  const companyCountries = await companyCountrySchema.find({ isoIds: { $ne: null } }).populate('isoIds');
  return companyCountries;
};

module.exports = {
  createCompanyCountry,
  getAllCompanyCountries,
  getAllIsosOfCompanyCountry,
  getAllCompanyCountriesWithIsos
};
const companySiteSchema = require('./companySiteSchema');
const companySchema = require('./../company/companySchema')

const createCompanySite = async (req) => {
  const companyId = req.params.companyId;
  const siteData = req.body;

  const companySite = new companySiteSchema(siteData);
  await companySite.save();

  /*
  Ahora agregamos el id de la sede creada a la compañia a la que pertenece
  */
  const company = await companySchema.findById(companyId);
  if(company.siteIds === null){
    company.siteIds = [companySite._id];
  }
  else{
    company.siteIds.push(companySite._id);
  }
  await company.save();

  return companySite;
};

const getAllCompanySites = async () => {
    const companySites = await companySiteSchema.find();
    return companySites;
};

const deleteCompanySite = async (req, res) => {
  const companySiteId = req.params.companySiteId;
  await companySiteSchema.findByIdAndDelete(companySiteId);
};

module.exports = {
  createCompanySite,
  getAllCompanySites,
  deleteCompanySite
};
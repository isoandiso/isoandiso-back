const companySiteSchema = require('./companySiteSchema');
const companySchema = require('./../company/companySchema')

const createCompanySite = async (req) => {
  const siteData = req.body;
  const companySite = new companySiteSchema(siteData);
  await companySite.save();
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
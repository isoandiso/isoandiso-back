const companySiteSchema = require('./companySiteSchema');

const createCompanySite = async (req) => {
  const companySite = new companySiteSchema(req.body);
  await companySite.save();
  return companySite;
};

const getAllCompanySites = async () => {
    const companySites = await companySiteSchema.find();
    return companySites;
};

const deleteCompanySite = async (req, res) => {
  const companySiteId = req.params.id;
  await companySiteSchema.findByIdAndDelete(companySiteId);
};

module.exports = {
  createCompanySite,
  getAllCompanySites,
  deleteCompanySite
};
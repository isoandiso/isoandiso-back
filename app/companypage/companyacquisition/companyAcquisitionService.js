const companyAcquisitionSchema = require('./companyAcquisitionSchema');

const createCompanyAcquisition = async (req) => {
  const companyAcquisition = new companyAcquisitionSchema(req.body);
  await companyAcquisition.save();
  return companyAcquisition;
};

const getAllCompanyAcquisitions = async () => {
    const companyAcquisitions = await companyAcquisitionSchema.find();
    return companyAcquisitions;
};

const getCompanyAcquisition = async (req) => {
  const companyAcquisitionId = req.params.companyAcquisitionId;
  const companyAcquisition = await companyAcquisitionSchema.findById(companyAcquisitionId);
  return companyAcquisition;
};

const deleteCompanyAcquisition = async (req) => {
  const companyAcquisitionId = req.params.companyAcquisitionId;
  await companyAcquisitionSchema.findByIdAndDelete(companyAcquisitionId);
};

module.exports = {
  createCompanyAcquisition,
  getAllCompanyAcquisitions,
  getCompanyAcquisition,
  deleteCompanyAcquisition
};

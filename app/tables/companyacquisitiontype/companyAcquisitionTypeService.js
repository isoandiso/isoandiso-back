const companyAcquisitionTypeSchema = require('./companyAcquisitionTypeSchema');

const createCompanyAcquisitionType = async (req) => {
  const companyAcquisitionType = new companyAcquisitionTypeSchema(req.body);
  await companyAcquisitionType.save();
  return companyAcquisitionType;
};

const getAllCompanyAcquisitionTypes = async () => {
    const companyAcquisitionTypes = await companyAcquisitionTypeSchema.find();
    return companyAcquisitionTypes;
};

module.exports = {
  createCompanyAcquisitionType,
  getAllCompanyAcquisitionTypes
};
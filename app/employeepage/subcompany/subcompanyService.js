const subcompanySchema = require('./subcompanySchema');

const createSubcompany = async (req) => {
  const subcompany = new subcompanySchema(req.body);
  await subcompany.save();
  return subcompany;
};

const getAllSubcompanies = async () => {
    const subcompanies = await subcompanySchema.find();
    return subcompanies;
};

const getSubcompany = async (req) => {
  const subcompanyId = req.params.subcompanyId;
  const subcompany = await subcompanySchema.findById(subcompanyId);
  return subcompany;
};

const deleteSubcompany = async (req) => {
  const subcompanyId = req.params.subcompanyId;
  await subcompanySchema.findByIdAndDelete(subcompanyId);
};

module.exports = {
  createSubcompany,
  getAllSubcompanies,
  getSubcompany,
  deleteSubcompany
};

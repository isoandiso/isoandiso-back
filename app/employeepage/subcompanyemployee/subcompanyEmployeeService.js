const subcompanyEmployeeSchema = require('./subcompanyEmployeeSchema');

const createSubcompanyEmployee = async (req) => {
  const subcompanyEmployee = new subcompanyEmployeeSchema(req.body);
  await subcompanyEmployee.save();
  return subcompanyEmployee;
};

const getAllSubcompanyEmployees = async () => {
    const subcompanyEmployees = await subcompanyEmployeeSchema.find();
    return subcompanyEmployees;
};

const getSubcompanyEmployee = async (req) => {
  const subcompanyEmployeeId = req.params.subcompanyEmployeeId;
  const subcompanyEmployee = await subcompanyEmployeeSchema.findById(subcompanyEmployeeId);
  return subcompanyEmployee;
};

const deleteSubcompanyEmployee = async (req) => {
  const subcompanyEmployeeId = req.params.subcompanyEmployeeId;
  await subcompanyEmployeeSchema.findByIdAndDelete(subcompanyEmployeeId);
};

module.exports = {
  createSubcompanyEmployee,
  getAllSubcompanyEmployees,
  getSubcompanyEmployee,
  deleteSubcompanyEmployee
};

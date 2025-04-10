const employeeNationalitySchema = require('./employeeNationalitySchema');

const createEmployeeNationality = async (req) => {
  const employeeNationality = new employeeNationalitySchema(req.body);
  await employeeNationality.save();
  return employeeNationality;
};

const getAllEmployeeNationalities = async () => {
    const employeeNationalities = await employeeNationalitySchema.find();
    return employeeNationalities;
};

module.exports = {
  createEmployeeNationality,
  getAllEmployeeNationalities
};
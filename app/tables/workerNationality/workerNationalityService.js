const workerNationalitySchema = require('./workerNationalitySchema');

const createWorkerNationality = async (req) => {
  const workerNationality = new workerNationalitySchema(req.body);
  await workerNationality.save();
  return workerNationality;
};

const getAllWorkerNationalities = async () => {
    const workerNationalities = await workerNationalitySchema.find();
    return workerNationalities;
};

module.exports = {
  createWorkerNationality,
  getAllWorkerNationalities
};
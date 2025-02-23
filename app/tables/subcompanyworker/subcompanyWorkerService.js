const subcompanyWorkerSchema = require('./subcompanyWorkerSchema');

const createSubcompanyWorker = async (req) => {
  const subcompanyWorker = new subcompanyWorkerSchema(req.body);
  await subcompanyWorker.save();
  return subcompanyWorker;
};

const getAllSubcompanyWorkers = async () => {
    const subcompanyWorkers = await subcompanyWorkerSchema.find();
    return subcompanyWorkers;
};

const getSubcompanyWorker = async (req) => {
  const subcompanyWorkerId = req.params.id;
  const subcompanyWorker = await subcompanyWorkerSchema.findById(subcompanyWorkerId);
  return subcompanyWorker;
};

const deleteSubcompanyWorker = async (req) => {
  const subcompanyWorkerId = req.params.id;
  await subcompanyWorkerSchema.findByIdAndDelete(subcompanyWorkerId);
};

module.exports = {
  createSubcompanyWorker,
  getAllSubcompanyWorkers,
  getSubcompanyWorker,
  deleteSubcompanyWorker
};

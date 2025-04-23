const specificObjectiveSchema = require('./specificObjectiveSchema');

const createSpecificObjective = async (req) => {
  const specificObjective = new specificObjectiveSchema(req.body);
  await specificObjective.save();
  return specificObjective;
};

const getAllSpecificObjectives = async () => {
    const specificObjectives = await specificObjectiveSchema.find();
    return specificObjectives;
};

const getSpecificObjective = async (req) => {
  const specificObjectiveId = req.params.specificObjectiveId;
  const specificObjective = await specificObjectiveSchema.findById(specificObjectiveId);
  return specificObjective;
};

const deleteSpecificObjective = async (req) => {
  const specificObjectiveId = req.params.specificObjectiveId;
  await specificObjectiveSchema.findByIdAndDelete(specificObjectiveId);
};

module.exports = {
  createSpecificObjective,
  getAllSpecificObjectives,
  getSpecificObjective,
  deleteSpecificObjective
};

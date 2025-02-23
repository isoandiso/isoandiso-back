const generalObjectiveSchema = require('./generalObjectiveSchema');

const createGeneralObjective = async (req) => {
  const generalObjective = new generalObjectiveSchema(req.body);
  await generalObjective.save();
  return generalObjective;
};

const getAllGeneralObjectives = async () => {
    const generalObjectives = await generalObjectiveSchema.find();
    return generalObjectives;
};

const getGeneralObjective = async (req) => {
  const generalObjectiveId = req.params.id;
  const generalObjective = await generalObjectiveSchema.findById(generalObjectiveId);
  return generalObjective;
};

const deleteGeneralObjective = async (req) => {
  const generalObjectiveId = req.params.id;
  await generalObjectiveSchema.findByIdAndDelete(generalObjectiveId);
};

module.exports = {
  createGeneralObjective,
  getAllGeneralObjectives,
  getGeneralObjective,
  deleteGeneralObjective
};

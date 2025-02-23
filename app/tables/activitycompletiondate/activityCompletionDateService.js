const activityCompletionDateSchema = require('./activityCompletionDateSchema');

const createActivityComplianceDate = async (req) => {
  const activityCompletionDate = new activityCompletionDateSchema(req.body);
  await activityCompletionDate.save();
  return activityCompletionDate;
};

const getAllActivitiesComplianceDate = async () => {
    const activityCompletionDate = await activityCompletionDateSchema.find();
    return activityCompletionDate;
};

const getActivityComplianceDate = async (req) => {
  const activityCompletionDateId = req.params.id;
  const activityCompletionDate = await activityCompletionDateSchema.findById(activityCompletionDateId);
  return activityCompletionDate;
};

const deleteActivityComplianceDate = async (req) => {
  const activityCompletionDateId = req.params.id;
  await activityCompletionDateSchema.findByIdAndDelete(activityCompletionDateId);
};

module.exports = {
  createActivityComplianceDate,
  getAllActivitiesComplianceDate,
  getActivityComplianceDate,
  deleteActivityComplianceDate
};

const ActivitySchema = require('./activitySchema');

const createActivity = async (req) => {
  const activity = new ActivitySchema(req.body);
  await activity.save();
  return activity;
};

const getAllActivities = async () => {
    const activities = await ActivitySchema.find();
    return activities;
};

const getActivity = async (req) => {
  const activityId = req.params.id;
  const activity = await ActivitySchema.findById(activityId);
  return activity;
};

const deleteActivity = async (req) => {
  const activityId = req.params.id;
  await ActivitySchema.findByIdAndDelete(activityId);
};

module.exports = {
  createActivity,
  getAllActivities,
  getActivity,
  deleteActivity
};

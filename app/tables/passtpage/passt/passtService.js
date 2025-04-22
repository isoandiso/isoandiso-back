const Passt = require('./passtSchema');
const PasstItem = require('../../passtpage/passtitem/passtItemSchema');
const PasstItemActivity = require('../../passtpage/passtitem/passtItemSchema');
const CompanyArea = require('../../companypage/companyarea/companyAreaSchema');

const validateActivityFields = async (activities) => {
  const allActivities = [];
  for (const activity of activities || []) {
    if (!activity.activityId && !activity.activityText)
      throw new Error('Debe tener activityId o activityText');
    if (activity.activityId && activity.activityText)
      throw new Error('Solo debe tener activityId o activityText, no ambos');

    const key = activity.activityId || activity.activityText;
    if (allActivities.includes(key))
      throw new Error('activityId o activityText repetido');
    allActivities.push(key);

    const area = await CompanyArea.findById(activity.companyAreaId);
    if (!area) throw new Error('companyAreaId no válido');

    for (const destId of activity.companyDestinatedAreaId || []) {
      const dest = await CompanyArea.findById(destId);
      if (!dest) throw new Error('companyDestinatedAreaId no válido');
    }
  }
};

const createPasst = async (data) => {
  const exists = await Passt.findOne({ year: data.year, companySiteId: data.companySiteId });
  if (exists) throw new Error('Ya existe un PASST con el mismo año y companySiteId.');

  for (const item of data.items || []) {
    await validateActivityFields(item.passtItemActivites);
  }

  const passt = new Passt(data);
  return await passt.save();
};

const updatePasst = async (id, data) => {
  const existing = await Passt.findOne({ _id: { $ne: id }, year: data.year, companySiteId: data.companySiteId });
  if (existing) throw new Error('Ya existe un PASST con el mismo año y companySiteId.');

  for (const item of data.items || []) {
    await validateActivityFields(item.passtItemActivites);
  }

  return await Passt.findByIdAndUpdate(id, data, { new: true });
};

const deletePasst = async (id) => {
  return await Passt.findByIdAndDelete(id);
};

const getAllPassts = async () => {
  return await Passt.find()
    .populate({
      path: 'items',
      populate: { path: 'passtItemActivites' }
    });
};

const getPasstById = async (id) => {
  return await Passt.findById(id)
    .populate({
      path: 'items',
      populate: { path: 'passtItemActivites' }
    });
};

//PassItem
const createPasstItem = async (data) => {
  const item = new PasstItem(data);
  return await item.save();
};

const updatePasstItem = async (id, data) => {
  return await PasstItem.findByIdAndUpdate(id, data, { new: true });
};

const deletePasstItem = async (id) => {
  return await PasstItem.findByIdAndDelete(id);
};

const getAllPasstItems = async () => {
  return await PasstItem.find().populate('passtItemActivites');
};

const getPasstItemById = async (id) => {
  return await PasstItem.findById(id).populate('passtItemActivites');
};

//PasstItemActitivity

const createPasstItemActivity = async (data) => {
  await validateActivityFields([data]);
  const activity = new PasstItemActivity(data);
  return await activity.save();
};

const updatePasstItemActivity = async (id, data) => {
  await validateActivityFields([data]);
  return await PasstItemActivity.findByIdAndUpdate(id, data, { new: true });
};

const deletePasstItemActivity = async (id) => {
  return await PasstItemActivity.findByIdAndDelete(id);
};

const getAllPasstItemActivities = async () => {
  return await PasstItemActivity.find();
};

const getPasstItemActivityById = async (id) => {
  return await PasstItemActivity.findById(id);
};

module.exports = {
  createPasst,
  updatePasst,
  deletePasst,
  getAllPassts,
  getPasstById,
  createPasstItem,
  updatePasstItem,
  deletePasstItem,
  getAllPasstItems,
  getPasstItemById,
  createPasstItemActivity,
  updatePasstItemActivity,
  deletePasstItemActivity,
  getAllPasstItemActivities,
  getPasstItemActivityById
};
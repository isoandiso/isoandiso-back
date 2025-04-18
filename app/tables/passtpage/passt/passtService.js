const passtSchema = require('./passtSchema');
const passtItem = require('../passtitem/passtItemSchema');

const createPasst = async (req) => {
  const { year, companySiteId, items = [] } = req.body;

  // Validación 1: verificar si ya existe un PASST con mismo año y companySiteId
  const existingPasst = await passtSchema.findOne({ year, companySiteId });
  if (existingPasst) {
    const error = new Error('Ya existe un PASST registrado con el mismo año y y sede.');
    error.status = 400;
    throw error;
  }

  // Validación 2: evitar ítems duplicados con la misma combinación de objetivos
  const combinationSet = new Set();

  for (const itemId of items) {
    const item = await passtItem.findById(itemId);
    if (!item) {
      const error = new Error(`No se encontró el passtItem con ID: ${itemId}`);
      error.status = 400;
      throw error;
    }

    const comboKey = `${item.generalObjectiveId || 'null'}-${item.specificObjectiveId || 'null'}-${item.managementToolId || 'null'}-${item.activityId || 'null'}`;
    
    if (combinationSet.has(comboKey)) {
      const error = new Error(`Ya existe un ítem con la combinación de objetivos`);
      error.status = 400;
      throw error;
    }

    combinationSet.add(comboKey);
  }

  // Si todo está ok, se crea el nuevo PASST
  const passt = new passt(req.body);
  await passt.save();
  return passt;
};

const getPassts= async () => {
    const passts = await passtSchema.find();
    return passts;
};

const getPasst = async (req) => {
  const passtId = req.params.id;
  const passt = await passtSchema.findById(passtId)
    .populate({
      path: 'items',
      populate: [
        { path: 'generalObjectiveId' },
        { path: 'specificObjectiveId' },
        { path: 'managementToolId' },
        { path: 'activityId' },
        { path: 'companyAreaId' },
        { path: 'companyDestinatedAreaId' }
      ]
    })
    .populate('companySiteId');

  return passt;
};

const deletePasst = async (req, res) => {
  const passtId = req.params.id;
  await passtSchema.findByIdAndDelete(passtId);
};

module.exports = {
  createPasst,
  getPasst,
  getPassts,
  deletePasst
};
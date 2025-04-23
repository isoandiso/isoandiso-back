const isoSchema = require('./isoSchema');

const createIso = async (req) => {
  const iso = new isoSchema(req.body);
  await iso.save();
  return iso;
};

const getAllIsos = async () => {
    const isos = await isoSchema.find();
    return isos;
};

const getIso = async (req) => {
  const isoId = req.params.isoId;
  const iso = await isoSchema.findById(isoId);
  if (!iso) {
    const error = new Error("ISO no encontrada");
    error.statusCode = 404;
    throw error;
  }
  return iso;
};

const getIsoByNameStartWith = async (req) => {
  const { isoName } = req.query;
  const iso = await isoSchema.findOne({ name: { $regex: `^${isoName}`, $options: 'i' } });
  if (!iso) {
    const error = new Error("ISO no encontrada, error obteniendo la iso por su nombre empezando con ..");
    error.statusCode = 404;
    throw error;
  }
  return iso;
};

const deleteIso = async (req) => {
  const isoId = req.params.isoId;
  await isoSchema.findByIdAndDelete(isoId);
};

module.exports = {
  createIso,
  getAllIsos,
  getIso,
  getIsoByNameStartWith,
  deleteIso
};
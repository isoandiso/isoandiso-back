const passtSchema = require('./passtSchema');

const createPasst = async (req) => {
  const passt = new passtSchema(req.body);
  await passt.save();
  return passt;
};

const getPassts= async () => {
    const passts = await passtSchema.find();
    return passts;
};

const getPasst = async (req) => {
  const passtId = req.params.id;
  const passt = await passtSchema.findById(passtId);
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
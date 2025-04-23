const rolSchema = require('./rolSchema');

const createRol = async (req) => {
  const rol = new rolSchema(req.body);
  await rol.save();
  return rol;
};

const getAllRoles = async () => {
    const roles = await rolSchema.find();
    return roles;
};

module.exports = {
  createRol,
  getAllRoles
};
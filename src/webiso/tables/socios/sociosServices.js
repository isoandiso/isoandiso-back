const socioSchema = require('./socioSchema.js'); // Cambiar a la tabla de socios
const bcrypt = require('bcryptjs');
const { createPartnerToken } = require('../../../token/jwt.js'); // Cambiar a generación de token para socios

//TOKEN

const register = async (req) => {
  const { email, nombre, apellido, rol, pais, iso, estatus, contraseña, createAt, updateAt } = req.body;
  const socio = await socioSchema.findOne({ email });
  if (socio) {
    const error = new Error("Socio ya existe con este email");
    error.statusCode = 404;
    throw error;
  }
  const passwordHash = await bcrypt.hash(contraseña, 10);
  socio.nombre = nombre;
  socio.apellido = apellido;
  socio.contraseña = passwordHash;
  socio.pais = pais;
  socio.iso = iso;  
  socio.rol = rol;
  socio.estatus = estatus;
  socio.createAt = createAt;
  socio.updateAt = updateAt;

  const socioActualizado = await socio.save();
  const partnerObject = socioActualizado.toObject();
  delete partnerObject.contraseña; 
  const token = createPartnerToken({ id: partnerObject._id });
  return { token, socio: partnerObject };
};

//COMMONS

const getAllPartners = async (req) => {
  const socios = await socioSchema.find(); // Obtener todos los socios
  return socios;
};

const getPartnerById = async (req) => {
  const socioId = req.params.id; // Obtener socio por ID
  const socio = await socioSchema.findById(socioId);
  return socio;
};

const updatePartnerById = async (req) => {
  const { contraseña, ...socio } = req.body;
  if (contraseña) {
    socio.contraseña = await bcrypt.hash(contraseña, 10);
  }
  const socioEncontrado = await socioSchema.findByIdAndUpdate(
    req.params.id,
    { $set: socio },
    { new: true }
  );
  if (!socioEncontrado) {
    const error = new Error("Socio no encontrado");
    error.statusCode = 404;
    throw error;
  }
  return socioEncontrado;
};

const deletePartnerById = async (req) => {
  const socioId = req.params.id; // Eliminar socio por ID
  await socioSchema.findByIdAndDelete(socioId);
};

module.exports = {
  register,
  getAllPartners,
  getPartnerById,
  updatePartnerById,
  deletePartnerById,
};

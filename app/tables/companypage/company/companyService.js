const companySchema = require('./companySchema.js');
const employeeSchema = require('../../employeepage/employee/employeeSchema.js');
const bcrypt = require('bcryptjs');
const { createToken } = require('../../../token.js');

//TOKEN

const register = async (req) => {
  const { email, phone, password } = req.body;
  const newCompany = new companySchema({ email, phone, password });
  const companySaved = await newCompany.save();

  //(hago que se tomen también los datos completos de los campos siguientes)
  const populatedCompany = await companySchema
  .findById(companySaved._id)
  .populate([
    { path: 'countryId',
      populate: [
        { path: 'isoIds' },
      ]
     },
    { path: 'acquisitionIds',
      populate: [
        { path: 'isoIds' },
        { path: 'acquisitionTypeId' },
      ] 
    },
    { path: 'siteIds' },
    { path: 'areaIds',
      populate: [
        { path: 'isoIds' },
        { path: 'responsibleEmployeeId' },
      ]  },
  ])
  .exec();

  const companyObject = populatedCompany.toObject();
  delete companyObject.password;
  const token = createToken({ id: populatedCompany._id });
  return { token, company: companyObject};
};

const login = async (req) => {
  const { email, password } = req.body;

  //(hago que se tomen también los datos completos de los campos siguientes)
  const company = await companySchema.findOne({ email }).populate([
    { path: 'countryId',
      populate: [
        { path: 'isoIds' },
      ]
     },
    { path: 'acquisitionIds',
      populate: [
        { path: 'isoIds' },
        { path: 'acquisitionTypeId' },
      ] 
    },
    { path: 'siteIds' },
    { path: 'areaIds',
      populate: [
        { path: 'isoIds' },
        { path: 'responsibleEmployeeId' },
      ]  },
  ])
  .exec();

  if (!company) {
    const error = new Error("Algunos de los datos son incorrectos o no está registrado");
    error.statusCode = 404;
    throw error;
  }
  const isMatch = await bcrypt.compare(password, company.password);
  if (!isMatch) {
    const error = new Error("Algunos de los datos son incorrectos o no está registrado");
    error.statusCode = 400;
    throw error;
  }

  const companyObject = company.toObject();
  delete companyObject.password;
  const token = createToken({ id: company._id });
  return { token, company: companyObject };
};

const profile = async (req) => {

  //(hago que se tomen también los datos completos de los campos siguientes)
  const company = await companySchema.findById(req.profile.id).populate([
    { path: 'countryId',
      populate: [
        { path: 'isoIds' },
      ]
     },
    { path: 'acquisitionIds',
      populate: [
        { path: 'isoIds' },
        { path: 'acquisitionTypeId' },
      ] 
    },
    { path: 'siteIds' },
    { path: 'areaIds',
      populate: [
        { path: 'isoIds' },
        { path: 'responsibleEmployeeId' },
      ]  },
  ])
  .exec();

  if (!company) {
    const error = new Error("Empresa no encontrada");
    error.statusCode = 404;
    throw error;
  }

  const companyObject = company.toObject();
  delete companyObject.password;
  return companyObject
};

//COMMONS

const getAllCompanies = async (req, res) => {
  const company = await companySchema.find();
  return company
};

const getCompany = async (req, res) => {
  const companyId = req.params.id;
  const company = await companySchema.findById(companyId);
  return company;
};

const deleteCompany = async (req, res) => {
  const companyId = req.params.id;
  await companySchema.findByIdAndDelete(companyId);
};

const getCompanyCountry = async (req, res) => {
  const companyId = req.params.id;
  const company = await companySchema.findById(companyId).populate('countryId');
  const companyCountry = company.countryId
  return companyCountry;
};

const getCompanyAcquisitions = async (req, res) => {
  const companyId = req.params.id;
  const company = await companySchema.findById(companyId).populate('acquisitionIds');
  const acquisitions = company.acquisitionIds
  return acquisitions;
};

const updatePassword = async (req) => {
  const { password } = req.body;
  if (!password) {
    const error = new Error("No hay password");
    error.statusCode = 400;
    throw error;
  }
  const passwordHashed = await bcrypt.hash(password, 10)
  const updatedCompany = await companySchema.findByIdAndUpdate(
    req.params.id,
    { $set: { password: passwordHashed } },
    { new: true }
  );
  if (!updatedCompany) {
    const error = new Error("Empresa no encontrada");
    error.statusCode = 404;
    throw error;
  }
  return updatedCompany;
};

const updateRuc = async (req) => {
  const { ruc } = req.body;
  if (!ruc) {
    const error = new Error("El ruc no está definido");
    error.statusCode = 400;
    throw error;
  }
  const updatedCompany = await companySchema.findByIdAndUpdate(
    req.params.id,
    { $set: { ruc: ruc } },
    { new: true }
  );
  if (!updatedCompany) {
    const error = new Error("Empresa no encontrada");
    error.statusCode = 404;
    throw error;
  }
  return updatedCompany;
};

const updateSocialReason = async (req) => {
  const { socialReason } = req.body;
  if (!socialReason) {
    const error = new Error("La razón social no está definido");
    error.statusCode = 400;
    throw error;
  }
  const updatedCompany = await companySchema.findByIdAndUpdate(
    req.params.id,
    { $set: { socialReason: socialReason } },
    { new: true }
  );
  if (!updatedCompany) {
    const error = new Error("Empresa no encontrada");
    error.statusCode = 404;
    throw error;
  }
  return updatedCompany;
};

const updateProvince = async (req) => {
  const { province } = req.body;
  if (!province) {
    const error = new Error("La provincia no está definida");
    error.statusCode = 400;
    throw error;
  }
  const updatedCompany = await companySchema.findByIdAndUpdate(
    req.params.id,
    { $set: { province: province } },
    { new: true }
  );
  if (!updatedCompany) {
    const error = new Error("Empresa no encontrada");
    error.statusCode = 404;
    throw error;
  }
  return updatedCompany;
};

const updateCity = async (req) => {
  const { city } = req.body;
  if (!city) {
    const error = new Error("La ciudad no está definida");
    error.statusCode = 400;
    throw error;
  }
  const updatedCompany = await companySchema.findByIdAndUpdate(
    req.params.id,
    { $set: { city: city } },
    { new: true }
  );
  if (!updatedCompany) {
    const error = new Error("Empresa no encontrada");
    error.statusCode = 404;
    throw error;
  }
  return updatedCompany;
};

const updateAddress = async (req) => {
  const { address } = req.body;
  if (!address) {
    const error = new Error("La dirección no está definida");
    error.statusCode = 400;
    throw error;
  }
  const updatedCompany = await companySchema.findByIdAndUpdate(
    req.params.id,
    { $set: { address: address } },
    { new: true }
  );
  if (!updatedCompany) {
    const error = new Error("Empresa no encontrada");
    error.statusCode = 404;
    throw error;
  }
  return updatedCompany;
};

const updateEconomicActivity = async (req) => {
  const { economicActivity } = req.body;
  if (!economicActivity) {
    const error = new Error("La actividad económica no está definida");
    error.statusCode = 400;
    throw error;
  }
  const updatedCompany = await companySchema.findByIdAndUpdate(
    req.params.id,
    { $set: { economicActivity: economicActivity } },
    { new: true }
  );
  if (!updatedCompany) {
    const error = new Error("Empresa no encontrada");
    error.statusCode = 404;
    throw error;
  }
  return updatedCompany;
};

const updateEconomicSector = async (req) => {
  const { economicSector } = req.body;
  if (!economicSector) {
    const error = new Error("El sector económico no está definido");
    error.statusCode = 400;
    throw error;
  }
  const updatedCompany = await companySchema.findByIdAndUpdate(
    req.params.id,
    { $set: { economicSector: economicSector } },
    { new: true }
  );
  if (!updatedCompany) {
    const error = new Error("Empresa no encontrada");
    error.statusCode = 404;
    throw error;
  }
  return updatedCompany;
};

const updateCompanySize = async (req) => {
  const { companySize } = req.body;
  if (!companySize) {
    const error = new Error("El tamaño no está definido");
    error.statusCode = 400;
    throw error;
  }
  const updatedCompany = await companySchema.findByIdAndUpdate(
    req.params.id,
    { $set: { companySize: companySize } },
    { new: true }
  );
  if (!updatedCompany) {
    const error = new Error("Empresa no encontrada");
    error.statusCode = 404;
    throw error;
  }
  return updatedCompany;
};

const updateCountry = async (req) => {
  const { countryId } = req.body;
  if (!countryId) {
    const error = new Error("El id país no está definido");
    error.statusCode = 400;
    throw error;
  }
  const updatedCompany = await companySchema.findByIdAndUpdate(
    req.params.id,
    { $set: { countryId: countryId } },
    { new: true }
  );
  if (!updatedCompany) {
    const error = new Error("Empresa no encontrada");
    error.statusCode = 404;
    throw error;
  }
  return updatedCompany;
};

const addAcquisition = async (req) => {
  const { acquisitionId } = req.body;
  if (!acquisitionId) {
    const error = new Error("La nueva adquisición no está definida");
    error.statusCode = 400;
    throw error;
  }
  const updatedCompany = await companySchema.findByIdAndUpdate(
    req.params.id,
    { $push: { acquisitionIds: acquisitionId } },
    { new: true }
  );
  if (!updatedCompany) {
    const error = new Error("Empresa no encontrada");
    error.statusCode = 404;
    throw error;
  }
  return updatedCompany;
};

const addSite = async (req) => {
  const { companySiteId } = req.body;
  if (!companySiteId) {
    const error = new Error("La nueva sede no está definida");
    error.statusCode = 400;
    throw error;
  }
  const updatedCompany = await companySchema.findByIdAndUpdate(
    req.params.id,
    { $push: { siteIds: companySiteId } },
    { new: true }
  );
  if (!updatedCompany) {
    const error = new Error("Empresa no encontrada");
    error.statusCode = 404;
    throw error;
  }
  return updatedCompany;
};

const addArea = async (req) => {
  const { companyAreaId } = req.body;
  if (!companyAreaId) {
    const error = new Error("La nueva área no está definida");
    error.statusCode = 400;
    throw error;
  }
  const updatedCompany = await companySchema.findByIdAndUpdate(
    req.params.id,
    { $push: { areaIds: companyAreaId } },
    { new: true }
  );
  if (!updatedCompany) {
    const error = new Error("Empresa no encontrada");
    error.statusCode = 404;
    throw error;
  }
  return updatedCompany;
};

const createEmployee = async (req) => {
  const employee = new employeeSchema(req.body);
  await employee.save();
  return employee
};

module.exports = {
  createEmployee,
  register,
  login,
  profile,
  getCompany,
  getAllCompanies,
  deleteCompany,
  getCompanyCountry,
  getCompanyAcquisitions,
  updatePassword,
  updateCountry,
  updateRuc,
  updateSocialReason,
  updateProvince,
  updateCity,
  updateAddress,
  updateEconomicActivity,
  updateEconomicSector,
  updateCompanySize,
  addAcquisition,
  addSite,
  addArea
};

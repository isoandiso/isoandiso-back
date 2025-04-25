const bcrypt = require('bcryptjs');
const companySchema = require('./companySchema.js');
const employeeSchema = require('../../employeepage/employee/employeeSchema.js');
const { createToken } = require('../../token.js');

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
        { path: 'employeeIds' },
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
        { path: 'employeeIds' },
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
        { path: 'employeeIds' },
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

const getAllCompanies = async (req) => {
  const company = await companySchema.find();
  return company
};

const getCompany = async (req) => {
  const companyId = req.params.companyId;
  const company = await companySchema.findById(companyId);
  return company;
};

const deleteCompany = async (req) => {
  const companyId = req.params.companyId;
  /*eliminamos la compañia*/
  await companySchema.findByIdAndDelete(companyId);
};

const getCompanyCountry = async (req) => {
  const companyId = req.params.companyId;
  
  const company = await companySchema.findById(companyId).populate('countryId');
  const companyCountry = company.countryId
  return companyCountry;
};

const getCompanyAcquisitions = async (req) => {
  const companyId = req.params.companyId;
  const company = await companySchema.findById(companyId).populate('acquisitionIds');
  const acquisitions = company.acquisitionIds
  return acquisitions;
};

const updatePassword = async (req) => {
  const companyId = req.params.companyId;
  const { password } = req.body;

  if (!password) {
    const error = new Error("No hay password");
    error.statusCode = 400;
    throw error;
  }
  const updatedCompany = await companySchema.findByIdAndUpdate(
    companyId,
    { $set: { password: password } },
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
  const companyId = req.params.companyId;
  const { ruc } = req.body;

  if (!ruc) {
    const error = new Error("El ruc no está definido");
    error.statusCode = 400;
    throw error;
  }
  const updatedCompany = await companySchema.findByIdAndUpdate(
    companyId,
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
  const companyId = req.params.companyId;
  const { socialReason } = req.body;

  if (!socialReason) {
    const error = new Error("La razón social no está definido");
    error.statusCode = 400;
    throw error;
  }
  const updatedCompany = await companySchema.findByIdAndUpdate(
    companyId,
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
  const companyId = req.params.companyId;
  const { province } = req.body;

  if (!province) {
    const error = new Error("La provincia no está definida");
    error.statusCode = 400;
    throw error;
  }
  const updatedCompany = await companySchema.findByIdAndUpdate(
    companyId,
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
  const companyId = req.params.companyId;
  const { city } = req.body;

  if (!city) {
    const error = new Error("La ciudad no está definida");
    error.statusCode = 400;
    throw error;
  }
  const updatedCompany = await companySchema.findByIdAndUpdate(
    companyId,
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
  const companyId = req.params.companyId;
  const { address } = req.body;

  if (!address) {
    const error = new Error("La dirección no está definida");
    error.statusCode = 400;
    throw error;
  }
  const updatedCompany = await companySchema.findByIdAndUpdate(
    companyId,
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
  const companyId = req.params.companyId;
  const { economicActivity } = req.body;

  if (!economicActivity) {
    const error = new Error("La actividad económica no está definida");
    error.statusCode = 400;
    throw error;
  }
  const updatedCompany = await companySchema.findByIdAndUpdate(
    companyId,
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
  const companyId = req.params.companyId;
  const { economicSector } = req.body;

  if (!economicSector) {
    const error = new Error("El sector económico no está definido");
    error.statusCode = 400;
    throw error;
  }
  const updatedCompany = await companySchema.findByIdAndUpdate(
    companyId,
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
  const companyId = req.params.companyId;
  const { companySize } = req.body;

  if (!companySize) {
    const error = new Error("El tamaño no está definido");
    error.statusCode = 400;
    throw error;
  }
  const updatedCompany = await companySchema.findByIdAndUpdate(
    companyId,
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
  const companyId = req.params.companyId;
  const countryId = req.params.countryId;

  if (!countryId) {
    const error = new Error("El id país no está definido");
    error.statusCode = 400;
    throw error;
  }
  const updatedCompany = await companySchema.findByIdAndUpdate(
    companyId,
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
  const companyId = req.params.companyId;
  const acquisitionId = req.params.acquisitionId;

  if (!acquisitionId) {
    const error = new Error("La nueva adquisición no está definida");
    error.statusCode = 400;
    throw error;
  }
  const updatedCompany = await companySchema.findByIdAndUpdate(
    companyId,
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
  const companyId = req.params.companyId;
  const companySiteId  =  req.params.companySiteId;

  if (!companySiteId) {
    const error = new Error("La nueva sede no está definida");
    error.statusCode = 400;
    throw error;
  }
  const updatedCompany = await companySchema.findByIdAndUpdate(
    companyId,
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
  const companyId = req.params.companyId;
  const companyAreaId = req.params.companyAreaId;

  if (!companyAreaId) {
    const error = new Error("La nueva área no está definida");
    error.statusCode = 400;
    throw error;
  }
  const updatedCompany = await companySchema.findByIdAndUpdate(
    companyId,
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

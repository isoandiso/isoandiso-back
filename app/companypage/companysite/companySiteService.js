const CompanySite = require('./companySiteSchema');
const sequelize = require('../../db');
const { DataTypes } = require('sequelize');
const Company = require('../company/companySchema');

// Crear sede
const createCompanySite = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const companyId = req.params.companyId;
    const siteData = req.body;
    // Creamos la sede y la asociamos a la compañía
    const companySite = await CompanySite.create({ ...siteData, companyId }, { transaction: t });
    // Asociar la sede a la compañía (si la relación está definida en el modelo)
    const company = await Company.findByPk(companyId, { transaction: t });
    if (!company) throw new Error('Compañía no encontrada');
    await company.addCompany_site(companySite, { transaction: t });
    await t.commit();
    res.status(201).json(companySite);
  } catch (error) {
    await t.rollback();
    res.status(error.statusCode || 500).json({ message: 'Error creando la sede de la empresa o al agregarla a la empresa', error: error.message });
  }
};

// Obtener todas las sedes
const getAllCompanySites = async (req, res) => {
  try {
    const companySites = await CompanySite.findAll();
    res.status(200).json(companySites);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas las sedes de las empresas', error: error.message });
  }
};

// Eliminar companySite por ID
const deleteCompanySite = async (req, res) => {
  try {
    const companySiteId = req.params.companySiteId;
    await CompanySite.destroy({ where: { id: companySiteId } });
    res.status(200).json({ message: 'Sede de la empresa eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando la sede de la empresa', error: error.message });
  }
};

module.exports = {
  createCompanySite,
  getAllCompanySites,
  deleteCompanySite,
};
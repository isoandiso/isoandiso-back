const Iso = require('./isoSchema');
const { Op } = require('sequelize');

// Crear ISO
const createIso = async (req, res) => {
  try {
    const iso = await Iso.create(req.body);
    res.status(201).json(iso);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando la ISO', error: error.message });
  }
};

// Obtener todas las ISO
const getAllIsos = async (req, res) => {
  try {
    const isos = await Iso.findAll();
    res.status(200).json(isos);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas las ISOs', error: error.message });
  }
};

// Obtener ISO por ID
const getIso = async (req, res) => {
  try {
    const isoId = req.params.isoId;
    const iso = await Iso.findByPk(isoId);
    if (!iso) {
      return res.status(404).json({ message: 'ISO no encontrada' });
    }
    res.status(200).json(iso);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo la ISO', error: error.message });
  }
};

// Obtener una ISO por su comienzo de nombre
const getIsoByNameStartWith = async (req, res) => {
  try {
    const { isoName } = req.query;
    const iso = await Iso.findOne({
      where: {
        name: {
          [Op.like]: `${isoName}%`
        }
      }
    });
    if (!iso) {
      return res.status(404).json({ message: 'ISO no encontrada, error obteniendo la iso por su nombre empezando con ..' });
    }
    res.status(200).json(iso);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo la iso por su nombre comenzando con ..', error: error.message });
  }
};

// Eliminar ISO por ID
const deleteIso = async (req, res) => {
  try {
    const isoId = req.params.isoId;
    await Iso.destroy({ where: { id: isoId } });
    res.status(200).json({ message: 'ISO eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando la ISO', error: error.message });
  }
};

module.exports = {
  createIso,
  getAllIsos,
  getIso,
  getIsoByNameStartWith,
  deleteIso,
};
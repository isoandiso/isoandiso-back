const subcompanyService = require('./subcompanyService');

const createSubcompany = async (req, res) => {
  try {
    const subcompany = await subcompanyService.createSubcompany(req);
    res.status(201).json(subcompany);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando la subempresa', error: error.message });
  }
};

const getAllSubcompanies = async (req, res) => {
  try {
    const subcompanies = await subcompanyService.getAllSubcompanies();
    res.status(200).json(subcompanies);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error agarrando todas las subempresas', error: error.message });
  }
};

const getSubcompany = async (req, res) => {
  try {
    const subcompany = await subcompanyService.getSubcompany(req);
    if (!subcompany) {
      return res.status(404).json({ message: 'Subempresa no encontrada' });
    }
    res.status(200).json(subcompany);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error agarrando la subempresa', error: error.message });
  }
};

const deleteSubcompany = async (req, res) => {
  try {
    await subcompanyService.deleteSubcompany(req);
    res.status(200).json({ message: 'Subempresa eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando la subempresa', error: error.message });
  }
};

module.exports = {
  createSubcompany,
  getAllSubcompanies,
  getSubcompany,
  deleteSubcompany
};
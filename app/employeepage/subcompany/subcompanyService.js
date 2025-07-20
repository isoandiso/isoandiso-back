const Subcompany = require('./subcompanySchema');

// Crear subempresa
const createSubcompany = async (req, res) => {
  try {
    const subcompany = await Subcompany.create(req.body);
    res.status(201).json(subcompany);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando la subempresa', error: error.message });
  }
};

// Obtener todas las subempresas
const getAllSubcompanies = async (req, res) => {
  try {
    const subcompanies = await Subcompany.findAll();
    res.status(200).json(subcompanies);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error agarrando todas las subempresas', error: error.message });
  }
};

// Obtener subempresa por ID
const getSubcompany = async (req, res) => {
  try {
    const subcompanyId = req.params.subcompanyId;
    const subcompany = await Subcompany.findByPk(subcompanyId);
    if (!subcompany) {
      return res.status(404).json({ message: 'Subempresa no encontrada' });
    }
    res.status(200).json(subcompany);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error agarrando la subempresa', error: error.message });
  }
};

// Eliminar subempresa por ID
const deleteSubcompany = async (req, res) => {
  try {
    const subcompanyId = req.params.subcompanyId;
    await Subcompany.destroy({ where: { id: subcompanyId } });
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

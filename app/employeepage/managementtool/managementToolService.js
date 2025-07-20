const ManagementTool = require('./managementToolSchema');

// Crear herramienta de gestión
const createManagementTool = async (req, res) => {
  try {
    const managementTool = await ManagementTool.create(req.body);
    res.status(201).json(managementTool);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando la herramienta de gestión', error: error.message });
  }
};

// Obtener todas las herramientas de gestión
const getAllManagementTools = async (req, res) => {
  try {
    const managementTools = await ManagementTool.findAll();
    res.status(200).json(managementTools);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas las herramientas de gestiones', error: error.message });
  }
};

// Obtener herramienta de gestión por ID
const getManagementTool = async (req, res) => {
  try {
    const managementToolId = req.params.managementToolId;
    const managementTool = await ManagementTool.findByPk(managementToolId);
    if (!managementTool) {
      return res.status(404).json({ message: 'Herramienta de gestión no encontrada' });
    }
    res.status(200).json(managementTool);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo la herramienta de gestión', error: error.message });
  }
};

// Eliminar herramienta de gestión por ID
const deleteManagementTool = async (req, res) => {
  try {
    const managementToolId = req.params.managementToolId;
    await ManagementTool.destroy({ where: { id: managementToolId } });
    res.status(200).json({ message: 'Herramienta de gestión eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando la herramienta de gestión', error: error.message });
  }
};

module.exports = {
  createManagementTool,
  getAllManagementTools,
  getManagementTool,
  deleteManagementTool
};

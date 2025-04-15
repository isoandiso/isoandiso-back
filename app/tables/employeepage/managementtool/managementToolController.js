const managementToolService = require('./managementToolService');

const createManagementTool = async (req, res) => {
  try {
    const managementTool = await managementToolService.createManagementTool(req);
    res.status(201).json(managementTool);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando la herramienta de gestión', error: error.message });
  }
};

const getAllManagementTools = async (req, res) => {
  try {
    const managementTools = await managementToolService.getAllManagementTools();
    res.status(200).json(managementTools);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas las herramientas de gestiones', error: error.message });
  }
};

const getManagementTool = async (req, res) => {
  try {
    const managementTool = await managementToolService.getManagementTool(req);
    if (!managementTool) {
      return res.status(404).json({ message: 'Herramienta de gestión no encontrada' });
    }
    res.status(200).json(managementTool);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo la herramienta de gestión', error: error.message });
  }
};

const deleteManagementTool = async (req, res) => {
  try {
    await managementToolService.deleteManagementTool(req);
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
const objectiveService = require('./objectiveService');


  /**
   * GET /objectives/tools
   * Devuelve las herramientas de gestión de un objetivo específico
   */
  const  getManagementTools = async (req, res) => {
    try {
      const tools = await objectiveService.getManagementTools();
      res.status(200).json(tools);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving management tools', error });
    }
  }

  /**
   * GET /objectives/tools/:id/activities
   * Devuelve las actividades de una herramienta de gestión
   */
   const  getActivitiesByManagementTool= async(req, res) => {
    try {
      const { id } = req.params;
      const activities = await objectiveService.getActivitiesByManagementTool(id);
      res.status(200).json(activities);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving activities', error });
    }
  }

  module.exports = {
    getManagementTools,
    getActivitiesByManagementTool
  };
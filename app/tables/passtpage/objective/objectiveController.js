const objectiveService = require('./objectiveService');
  /**
   * GET /objectives/general
   * Devuelve todos los objetivos generales
   */
  const  getAllGeneralObjectives = async(req,res)=> {
    try {
      const objectives = await objectiveService.getAllGeneralObjectives();
      res.status(200).json(objectives);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving general objectives', error });
    }
  }

  /**
   * GET /objectives/general/:id/specific
   * Devuelve los objetivos específicos de un objetivo general
   */
  const getSpecificObjectivesByGeneral = async (req, res) =>  {
    try {
      const { id } = req.params;
      const specificObjectives = await objectiveService.getSpecificObjectivesByGeneral(id);
      res.status(200).json(specificObjectives);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving specific objectives', error });
    }
  }

  /**
   * GET /objectives/specific/:id/tools
   * Devuelve las herramientas de gestión de un objetivo específico
   */
  const  getManagementToolsBySpecific = async (req, res) => {
    try {
      const { id } = req.params;
      const tools = await objectiveService.getManagementToolsBySpecific(id);
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
      res.status(500).json({ message: 'Error retrieving activities', error });
    }
  }

  module.exports = {
    getAllGeneralObjectives,
    getSpecificObjectivesByGeneral,
    getManagementToolsBySpecific,
    getActivitiesByManagementTool
  };
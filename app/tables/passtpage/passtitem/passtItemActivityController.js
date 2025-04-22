const {
    createPasstItemActivity,
    updatePasstItemActivity,
    deletePasstItemActivity
    } = require('../passt/passtService');
    // Crear un nuevo passtItem
    const createPasstItemAct = async (req, res) => {
      try {
        const itemData = req.body;
    
        const result = await   createPasstItemActivity( itemData);
        res.status(201).json(result);
      } catch (error) {
        console.error('Error al crear el item de la actividad:', error);
        res.status(500).json({ message: 'Error al crear el item de la actividad', error });
      }
    };
    
    // Actualizar un passtItem
    const updatePasstItemAct = async (req, res) => {
      try {
        const { activityId } = req.params;
        const updatedData = req.body;
    
        const result = await updatePasstItemActivity(activityId, updatedData);
        res.status(200).json(result);
      } catch (error) {
        console.error('Error al actualizar el item actividad:', error);
        res.status(500).json({ message: 'Error al actualizar el item actividad', error });
      }
    };
    
    // Eliminar un passtItem
    const deletePasstItemAct = async (req, res) => {
      try {
        const { activityId } = req.params;
        const result = await deletePasstItemActivity(activityId);
        res.status(200).json({ message: 'Item Actividad eliminado correctamente', result });
      } catch (error) {
        console.error('Error al eliminar el item Actividad:', error);
        res.status(500).json({ message: 'Error al eliminar el item Actividad', error });
      }
    };
    
    module.exports = {
        createPasstItemAct,
        updatePasstItemAct,
        deletePasstItemAct
    };
    
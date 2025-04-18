const {
    addPasstItem,
    updatePasstItem,
    deletePasstItem
  } = require('./passItemService'); 
  // Crear un nuevo passtItem
  const createItem = async (req, res) => {
    try {
      const { passtId } = req.params;
      const itemData = req.body;
  
      const result = await addPasstItem(passtId, itemData);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error al crear el item:', error);
      res.status(500).json({ message: 'Error al crear el item', error });
    }
  };
  
  // Actualizar un passtItem
  const updateItem = async (req, res) => {
    try {
      const { itemId } = req.params;
      const updatedData = req.body;
  
      const result = await updatePasstItem(itemId, updatedData);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error al actualizar el item:', error);
      res.status(500).json({ message: 'Error al actualizar el item', error });
    }
  };
  
  // Eliminar un passtItem
  const deleteItem = async (req, res) => {
    try {
      const { itemId } = req.params;
      const result = await deletePasstItem(itemId);
      res.status(200).json({ message: 'Item eliminado correctamente', result });
    } catch (error) {
      console.error('Error al eliminar el item:', error);
      res.status(500).json({ message: 'Error al eliminar el item', error });
    }
  };
  
  module.exports = {
    createItem,
    updateItem,
    deleteItem
  };
  
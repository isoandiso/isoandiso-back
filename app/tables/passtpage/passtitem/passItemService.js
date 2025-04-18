const passtItemModel = require('./passtItemSchema');
const passtModel = require('../../passtpage/passt/passtSchema');

// Agregar un nuevo passtItem
const addPasstItem = async (req, res) => {
  try {
    const { passtId } = req.params;
    const newItemData = req.body;

    // Verificar si ya existe un item con el mismo activityId
    const exists = await passtItemModel.findOne({ activityId: newItemData.activityId });

    if (exists) {
      return res.status(400).json({ message: 'Ya existe un item con ese activityId' });
    }

    // Crear el item
    const newItem = new passtItemModel(newItemData);
    await newItem.save();

    // Asociar el item al passt
    const passt = await passtModel.findById(passtId);
    if (!passt) return res.status(404).json({ message: 'Passt no encontrado' });

    passt.items.push(newItem._id);
    await passt.save();

    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error al agregar passtItem:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const updatePasstItem = async (req, res) => {
    try {
      const { itemId } = req.params;
      const updatedData = req.body;
  
      // Verificar si hay otro item (diferente al actual) con el mismo activityId
      if (updatedData.activityId) {
        const duplicate = await passtItemModel.findOne({
          _id: { $ne: itemId },
          activityId: updatedData.activityId
        });
  
        if (duplicate) {
          return res.status(400).json({ message: 'Ya existe otro item con ese activityId' });
        }
      }
  
      const updatedItem = await passtItemModel.findByIdAndUpdate(itemId, updatedData, { new: true });
  
      if (!updatedItem) {
        return res.status(404).json({ message: 'Item no encontrado' });
      }
  
      res.status(200).json(updatedItem);
    } catch (error) {
      console.error('Error al actualizar passtItem:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };

const deletePasstItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    // Buscar el item para obtener su ID
    const item = await passtItemModel.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item no encontrado' });
    }

    // Eliminar el item
    await passtItemModel.findByIdAndDelete(itemId);

    // Quitar referencia del array en passt
    await passtModel.updateMany(
      { items: itemId },
      { $pull: { items: itemId } }
    );

    res.status(200).json({ message: 'Item eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar passtItem:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};



  module.exports = {
    addPasstItem,
    updatePasstItem,
    deletePasstItem
  };

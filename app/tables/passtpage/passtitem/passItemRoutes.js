const express = require('express');
const router = express.Router();

const {
  createItem,
  updateItem,
  deleteItem
} = require('./passtItemController');

// Crear un nuevo item
router.post('passt/:passtId/items', createItem);

// Actualizar item
router.put('passt/items/:itemId', updateItem);

// Eliminar item
router.delete('passt/items/:itemId', deleteItem);

module.exports = router;

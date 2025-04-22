const express = require('express');
const router = express.Router();

const {
    createPasstItemAct,
    updatePasstItemAct,
  deletePasstItemAct
} = require('./passtItemActivityController');

// Crear un nuevo item
router.post('passt/items/activity', createPasstItemAct);

// Actualizar item
router.put('passt/items/activity/:activityId', updatePasstItemAct);

// Eliminar item
router.delete('passt/items/activity/:activityId', deletePasstItemAct);

module.exports = router;
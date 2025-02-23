const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../token');

//CONTROLADOR
const generalObjectiveController = require('./generalObjectiveController');

//RUTAS
router.post('/generalObjective', verifyToken, generalObjectiveController.createGeneralObjective);
router.get('/generalObjective', verifyToken, generalObjectiveController.getAllGeneralObjectives);
router.get('/generalObjective/:id', verifyToken, generalObjectiveController.getGeneralObjective);
router.delete('/generalObjective/:id', verifyToken, generalObjectiveController.deleteGeneralObjective);

module.exports = router;
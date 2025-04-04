const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../../token');

//CONTROLADOR
const specificObjectiveController = require('./specificObjectiveController');

//RUTAS
router.post('/specificObjective', verifyToken, specificObjectiveController.createSpecificObjective);
router.get('/specificObjective', verifyToken, specificObjectiveController.getAllSpecificObjectives);
router.get('/specificObjective/:id', verifyToken, specificObjectiveController.getSpecificObjective);
router.delete('/specificObjective/:id', verifyToken, specificObjectiveController.deleteSpecificObjective);

module.exports = router;

const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../../token');

//CONTROLADOR
const generalObjectiveController = require('./generalObjectiveController');

//RUTAS

//POSTS
router.post('/generalObjective', verifyToken, generalObjectiveController.createGeneralObjective);

//PUTS

//GETS
router.get('/generalObjective', verifyToken, generalObjectiveController.getAllGeneralObjectives);
router.get('/generalObjective/:id', verifyToken, generalObjectiveController.getGeneralObjective);

//DELETES
router.delete('/generalObjective/:id', verifyToken, generalObjectiveController.deleteGeneralObjective);

module.exports = router;
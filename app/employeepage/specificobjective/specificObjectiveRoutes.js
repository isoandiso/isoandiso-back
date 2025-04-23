const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../token');

//CONTROLADOR
const specificObjectiveController = require('./specificObjectiveController');

//RUTAS

//POSTS
router.post('/specificObjective', verifyToken, specificObjectiveController.createSpecificObjective);

//PUTS

//GETS
router.get('/specificObjective', verifyToken, specificObjectiveController.getAllSpecificObjectives);
router.get('/specificObjective/:specificObjectiveId', verifyToken, specificObjectiveController.getSpecificObjective);

//DELETES
router.delete('/specificObjective/:specificObjectiveId', verifyToken, specificObjectiveController.deleteSpecificObjective);

module.exports = router;

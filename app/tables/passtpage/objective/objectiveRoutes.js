const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../../token');

//CONTROLADOR
const objectiveController = require('./objectiveController');

//RUTAS
router.get('/objective/general', verifyToken, objectiveController.getAllGeneralObjectives);
router.get('/objective/:id/specifics', verifyToken, objectiveController.getSpecificObjectivesByGeneral);
router.get('/objective/specifics/:id/managmenttools', verifyToken, objectiveController.getManagementToolsBySpecific);
router.get('/objective/specifics/managmenttools/:id/activities', verifyToken, objectiveController.getActivitiesByManagementTool);

module.exports = router;

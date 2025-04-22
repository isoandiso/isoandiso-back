const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../../token');

//CONTROLADOR
const objectiveController = require('./objectiveController');

//RUTAS
router.get('/objective/managmenttools', verifyToken, objectiveController.getManagementTools);
router.get('/objective/managmenttools/:id/activities', verifyToken, objectiveController.getActivitiesByManagementTool);

module.exports = router;

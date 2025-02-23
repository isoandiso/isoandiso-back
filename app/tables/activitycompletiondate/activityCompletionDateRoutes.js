const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../token');

//CONTROLADOR
const activityCompletionDateController = require('./activityCompletionDateController');

//RUTAS
router.post('/activityCompletionDate', verifyToken, activityCompletionDateController.createActivityComplianceDate);
router.get('/activityCompletionDate', verifyToken, activityCompletionDateController.getAllActivitiesComplianceDate);
router.get('/activityCompletionDate/:id', verifyToken, activityCompletionDateController.getActivityComplianceDate);
router.delete('/activityCompletionDate/:id', verifyToken, activityCompletionDateController.deleteActivityComplianceDate);

module.exports = router;
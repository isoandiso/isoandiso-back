const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../token');

//CONTROLADOR
const activityController = require('./activityController');

//RUTAS
router.post('/activity', verifyToken, activityController.createActivity);
router.get('/activity', verifyToken, activityController.getAllActivities);
router.get('/activity/:id', verifyToken, activityController.getActivity);
router.delete('/activity/:id', verifyToken, activityController.deleteActivity);

module.exports = router;
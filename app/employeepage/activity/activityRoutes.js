const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../token');

//CONTROLADOR
const activityController = require('./activityController');

//RUTAS

//POSTS
router.post('/activity', verifyToken, activityController.createActivity);

//PUTS

//GETS
router.get('/activity', verifyToken, activityController.getAllActivities);
router.get('/activity/:activityId', verifyToken, activityController.getActivity);

//DELETES
router.delete('/activity/:activityId', verifyToken, activityController.deleteActivity);

module.exports = router;
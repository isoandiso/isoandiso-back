const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../token');

//SERVICIO
const activityService = require('./activityService');

//RUTAS

//POSTS
router.post('/activity', verifyToken, activityService.createActivity);

//PUTS

//GETS
router.get('/activity', verifyToken, activityService.getAllActivities);
router.get('/activity/:activityId', verifyToken, activityService.getActivity);

//DELETES
router.delete('/activity/:activityId', verifyToken, activityService.deleteActivity);

module.exports = router;
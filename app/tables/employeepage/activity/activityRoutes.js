const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../../token');

//CONTROLADOR
const activityController = require('./activityController');

//RUTAS

//POSTS
router.post('/activity', verifyToken, activityController.createActivity);
//PUTS

//GETS
router.get('/activity', verifyToken, activityController.getAllActivities);
router.get('/activity/:id', verifyToken, activityController.getActivity);

//DELETES
router.delete('/activity/:id', verifyToken, activityController.deleteActivity);

module.exports = router;
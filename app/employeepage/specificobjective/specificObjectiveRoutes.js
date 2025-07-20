const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../token');

//SERVICIO
const specificObjectiveService = require('./specificObjectiveService');

//RUTAS

//POSTS
router.post('/specificObjective', verifyToken, specificObjectiveService.createSpecificObjective);

//PUTS

//GETS
router.get('/specificObjective', verifyToken, specificObjectiveService.getAllSpecificObjectives);
router.get('/specificObjective/:specificObjectiveId', verifyToken, specificObjectiveService.getSpecificObjective);

//DELETES
router.delete('/specificObjective/:specificObjectiveId', verifyToken, specificObjectiveService.deleteSpecificObjective);

module.exports = router;

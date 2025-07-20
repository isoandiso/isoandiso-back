const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../token');

//SERVICIO
const generalObjectiveService = require('./generalObjectiveService');

//RUTAS

//POSTS
router.post('/generalobjective', verifyToken, generalObjectiveService.createGeneralObjective);

//PUTS

//GETS
router.get('/generalobjective', verifyToken, generalObjectiveService.getAllGeneralObjectives);
router.get('/generalobjective/:generalobjectiveid', verifyToken, generalObjectiveService.getGeneralObjective);

//DELETES
router.delete('/generalobjective/:generalobjectiveid', verifyToken, generalObjectiveService.deleteGeneralObjective);

module.exports = router;
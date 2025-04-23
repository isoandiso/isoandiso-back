const express = require('express');
const router = express.Router();

// MIDDLEWARE
const { verifyToken } = require('../../token');

// CONTROLADOR
const companyAcquisitionTypeController = require('./companyAcquisitionTypeController');

// RUTAS

//POSTS
router.post('/companyAcquisitionType', verifyToken, companyAcquisitionTypeController.createCompanyAcquisitionType);

//PUTS

//GETS
router.get('/companyAcquisitionType', verifyToken, companyAcquisitionTypeController.getAllCompanyAcquisitionTypes);

//DELETES


module.exports = router;
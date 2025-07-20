const express = require('express');
const router = express.Router();

// MIDDLEWARE
const { verifyToken } = require('../../token');

// SERVICIO
const companyAcquisitionTypeService = require('./companyAcquisitionTypeService');

// RUTAS

//POSTS
router.post('/companyAcquisitionType', verifyToken, companyAcquisitionTypeService.createCompanyAcquisitionType);

//PUTS

//GETS
router.get('/companyAcquisitionType', verifyToken, companyAcquisitionTypeService.getAllCompanyAcquisitionTypes);

//DELETES

module.exports = router;
const express = require('express');
const router = express.Router();

// MIDDLEWARE
const { verifyToken } = require('../../token');

// CONTROLADOR
const companyAcquisitionTypeController = require('./companyAcquisitionTypeController');

// RUTAS
router.post('/companyAcquisitionType', verifyToken, companyAcquisitionTypeController.createCompanyAcquisitionType);
router.get('/companyAcquisitionType', verifyToken, companyAcquisitionTypeController.getAllCompanyAcquisitionTypes);

module.exports = router;
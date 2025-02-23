const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../token');

//CONTROLADOR
const companyAcquisitionController = require('./companyAcquisitionController');

//RUTAS
router.post('/companyAcquisition', verifyToken, companyAcquisitionController.createCompanyAcquisition);
router.get('/companyAcquisition', verifyToken, companyAcquisitionController.getAllCompanyAcquisitions);
router.get('/companyAcquisition/:id', verifyToken, companyAcquisitionController.getCompanyAcquisition);
router.delete('/companyAcquisition/:id', verifyToken, companyAcquisitionController.deleteCompanyAcquisition);

module.exports = router;

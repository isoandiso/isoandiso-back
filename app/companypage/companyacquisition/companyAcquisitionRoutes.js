const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../token');

//SERVICIO
const companyAcquisitionService = require('./companyAcquisitionService');

//RUTAS

//POSTS
router.post('/companyAcquisition', verifyToken, companyAcquisitionService.createCompanyAcquisition);

//PUTS

//GETS
router.get('/companyAcquisition', verifyToken, companyAcquisitionService.getAllCompanyAcquisitions);
router.get('/companyAcquisition/:companyAcquisitionId', verifyToken, companyAcquisitionService.getCompanyAcquisition);

//DELETES
router.delete('/companyAcquisition/:companyAcquisitionId', verifyToken, companyAcquisitionService.deleteCompanyAcquisition);

module.exports = router;

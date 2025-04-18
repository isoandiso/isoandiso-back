const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../../token');

//CONTROLADOR
const companyAcquisitionController = require('./companyAcquisitionController');

//RUTAS

//POSTS
router.post('/companyAcquisition', verifyToken, companyAcquisitionController.createCompanyAcquisition);

//PUTS


//GETS
router.get('/companyAcquisition', verifyToken, companyAcquisitionController.getAllCompanyAcquisitions);
router.get('/companyAcquisition/:id', verifyToken, companyAcquisitionController.getCompanyAcquisition);

//DELETES
router.delete('/companyAcquisition/:id', verifyToken, companyAcquisitionController.deleteCompanyAcquisition);

module.exports = router;

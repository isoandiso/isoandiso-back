const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../../token');

//CONTROLADOR
const companyCountryController = require('./companyCountryController');

//RUTAS
router.post('/companyCountry', verifyToken, companyCountryController.createCompanyCountry);
router.get('/companyCountry', verifyToken, companyCountryController.getAllCompanyCountries);
router.get('/companyCountry/:id/getisos', verifyToken, companyCountryController.getAllIsosOfCompanyCountry);
router.get('/companyCountry/withIsos', verifyToken, companyCountryController.getAllCompanyCountriesWithIsos);

module.exports = router;

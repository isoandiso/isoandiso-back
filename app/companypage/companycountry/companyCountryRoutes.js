const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../token');

//SERVICIO
const companyCountryService = require('./companyCountryService');

//RUTAS

//POST
router.post('/companyCountry', verifyToken, companyCountryService.createCompanyCountry);

//PUTS

//GETS
router.get('/companyCountry', verifyToken, companyCountryService.getAllCompanyCountries);
router.get('/companyCountry/getisos/:countryId', verifyToken, companyCountryService.getAllIsosOfCompanyCountry);
router.get('/companyCountry/withIsos', verifyToken, companyCountryService.getAllCompanyCountriesWithIsos);

//DELETES

module.exports = router;

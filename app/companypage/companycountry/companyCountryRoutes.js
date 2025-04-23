const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../token');

//CONTROLADOR
const companyCountryController = require('./companyCountryController');

//RUTAS

//POST
router.post('/companyCountry', verifyToken, companyCountryController.createCompanyCountry);

//PUTS

//GETS
router.get('/companyCountry', verifyToken, companyCountryController.getAllCompanyCountries);
router.get('/companyCountry/getisos/:countryId', verifyToken, companyCountryController.getAllIsosOfCompanyCountry);
router.get('/companyCountry/withIsos', verifyToken, companyCountryController.getAllCompanyCountriesWithIsos);


//DELETES


module.exports = router;

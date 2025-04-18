const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../../token');

//CONTROLADOR
const companyController = require('./companyController');

//RUTAS

//POSTS
router.post('/company/register', companyController.register);
router.post('/company/login', companyController.login);
router.post('/company/logout',verifyToken, companyController.logout);

//PUTS
router.put('/company/:id/updatePassword', verifyToken, companyController.updatePassword);
router.put('/company/:id/updateCountry', verifyToken, companyController.updateCountry);
router.put('/company/:id/updateRuc', verifyToken, companyController.updateRuc);
router.put('/company/:id/updateSocialReason', verifyToken, companyController.updateSocialReason);
router.put('/company/:id/updateProvince', verifyToken, companyController.updateProvince);
router.put('/company/:id/updateCity', verifyToken, companyController.updateCity);
router.put('/company/:id/updateAddress', verifyToken, companyController.updateAddress);
router.put('/company/:id/updateEconomicActivity', verifyToken, companyController.updateEconomicActivity);
router.put('/company/:id/updateEconomicSector', verifyToken, companyController.updateEconomicSector);
router.put('/company/:id/updateCompanySize', verifyToken, companyController.updateCompanySize);
router.put('/company/:id/addAcquisition', verifyToken, companyController.addAcquisition);
router.put('/company/:id/addSite', verifyToken, companyController.addSite);
router.put('/company/:id/addArea', verifyToken, companyController.addArea);
router.get('/company/:id/country', verifyToken, companyController.getCompanyCountry);
router.get('/company/:id/acquisitions', verifyToken, companyController.getCompanyAcquisitions);
//(endpoint que crea un trabajador en la tabla "Employee")
router.post('/company/createEmployee',verifyToken, companyController.createEmployee);

//GETS
router.get('/company/profile', verifyToken, companyController.profile);
router.get('/company/', verifyToken, companyController.getAllCompanies);
router.get('/company/:id', verifyToken, companyController.getCompany);

//DELETES
router.delete('/company/:id', verifyToken, companyController.deleteCompany);

module.exports = router;

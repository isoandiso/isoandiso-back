const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../token');

//CONTROLADOR
const companyController = require('./companyController');

//RUTAS

//POSTS
router.post('/company/register', companyController.register);
router.post('/company/login', companyController.login);
router.post('/company/logout',verifyToken, companyController.logout);
//(endpoint que crea un trabajador en la tabla "Employee")
router.post('/company/createEmployee',verifyToken, companyController.createEmployee);

//PUTS
router.put('/company/updatePassword/:companyId', verifyToken, companyController.updatePassword);
router.put('/company/updateCountry/:companyId/:countryId', verifyToken, companyController.updateCountry);
router.put('/company/updateRuc/:companyId', verifyToken, companyController.updateRuc);
router.put('/company/updateSocialReason/:companyId', verifyToken, companyController.updateSocialReason);
router.put('/company/updateProvince/:companyId', verifyToken, companyController.updateProvince);
router.put('/company/updateCity/:companyId', verifyToken, companyController.updateCity);
router.put('/company/updateAddress/:companyId', verifyToken, companyController.updateAddress);
router.put('/company/updateEconomicActivity/:companyId', verifyToken, companyController.updateEconomicActivity);
router.put('/company/updateEconomicSector/:companyId', verifyToken, companyController.updateEconomicSector);
router.put('/company/updateCompanySize/:companyId', verifyToken, companyController.updateCompanySize);
router.put('/company/addAcquisition/:companyId/:acquisitionId', verifyToken, companyController.addAcquisition);
router.put('/company/addSite/:companyId/:companySiteId', verifyToken, companyController.addSite);
router.put('/company/addArea/:companyId/:companyAreaId', verifyToken, companyController.addArea);

//GETS
router.get('/company/profile', verifyToken, companyController.profile);
router.get('/company/', verifyToken, companyController.getAllCompanies);
router.get('/company/:companyId', verifyToken, companyController.getCompany);
router.get('/company/country/:companyId', verifyToken, companyController.getCompanyCountry);
router.get('/company/acquisitions/:companyId', verifyToken, companyController.getCompanyAcquisitions);

//DELETES
router.delete('/company/:companyId', verifyToken, companyController.deleteCompany);

module.exports = router;

const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../token');

//SERVICIO
const companyService = require('./companyService');

//RUTAS

//POSTS
router.post('/company/register', companyService.register);
router.post('/company/login', companyService.login);
router.post('/company/logout', verifyToken, companyService.logout);
//(endpoint que crea un trabajador en la tabla "Employee")
router.post('/company/createEmployee', verifyToken, companyService.createEmployee);

//PUTS
router.put('/company/updatePassword/:companyId', verifyToken, companyService.updatePassword);
router.put('/company/updateCountry/:companyId/:countryId', verifyToken, companyService.updateCountry);
router.put('/company/updateRuc/:companyId', verifyToken, companyService.updateRuc);
router.put('/company/updateSocialReason/:companyId', verifyToken, companyService.updateSocialReason);
router.put('/company/updateProvince/:companyId', verifyToken, companyService.updateProvince);
router.put('/company/updateCity/:companyId', verifyToken, companyService.updateCity);
router.put('/company/updateAddress/:companyId', verifyToken, companyService.updateAddress);
router.put('/company/updateEconomicActivity/:companyId', verifyToken, companyService.updateEconomicActivity);
router.put('/company/updateEconomicSector/:companyId', verifyToken, companyService.updateEconomicSector);
router.put('/company/updateCompanySize/:companyId', verifyToken, companyService.updateCompanySize);
router.put('/company/addAcquisition/:companyId/:acquisitionId', verifyToken, companyService.addAcquisition);
router.put('/company/addSite/:companyId/:companySiteId', verifyToken, companyService.addSite);
router.put('/company/addArea/:companyId/:companyAreaId', verifyToken, companyService.addArea);

//GETS
router.get('/company/profile', verifyToken, companyService.profile);
router.get('/company/', verifyToken, companyService.getAllCompanies);
router.get('/company/:companyId', verifyToken, companyService.getCompany);
router.get('/company/country/:companyId', verifyToken, companyService.getCompanyCountry);
router.get('/company/acquisitions/:companyId', verifyToken, companyService.getCompanyAcquisitions);

//DELETES
router.delete('/company/:companyId', verifyToken, companyService.deleteCompany);

module.exports = router;

const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../../token');

//CONTROLADOR
const employeeCompanyRegistryController = require('./employeeCompanyRegistryController');

//RUTAS

//POSTS
router.post('/employeeCompanyRegistry/create', verifyToken,employeeCompanyRegistryController.create);

//PUTS
router.put('/employeeCompanyRegistry/putCompanyToEmployee/:companyId/:employeeEmail', verifyToken, employeeCompanyRegistryController.putCompanyToEmployee);

//GETS
router.get('/employeeCompanyRegistry/getCompaniesOfEmployee/:employeeEmail', verifyToken, employeeCompanyRegistryController.getCompaniesOfEmployee);

//DELETES

module.exports = router;
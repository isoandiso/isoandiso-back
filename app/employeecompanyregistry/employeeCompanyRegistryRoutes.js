const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../token');

//SERVICIO
const employeeCompanyRegistryService = require('./employeeCompanyRegistryService');

//RUTAS

//POSTS

//PUTS

//GETS
router.get('/employeeCompanyRegistry/getCompaniesOfEmployee/:employeeEmail', verifyToken, employeeCompanyRegistryService.getCompaniesOfEmployee);

//DELETES

module.exports = router;
const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../token');

//CONTROLADOR
const employeeCompanyRegistryController = require('./employeeCompanyRegistryController');

//RUTAS

//POSTS

//PUTS

//GETS
router.get('/employeeCompanyRegistry/getCompaniesOfEmployee/:employeeEmail', verifyToken, employeeCompanyRegistryController.getCompaniesOfEmployee);

//DELETES


module.exports = router;
const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../../token');

//CONTROLADOR
const employeeController = require('./employeeController');

//RUTAS
router.post('/employee/register', employeeController.register);
router.post('/employee/login', employeeController.login);
router.post('/employee/logout', verifyToken, employeeController.logout);
router.get('/employee/profile', verifyToken, employeeController.profile);
router.get('/employee/', verifyToken, employeeController.getAllCompanyEmployees);
router.get('/employee/:id', verifyToken, employeeController.getCompanyEmployee);
router.get('/employee/getCompanyEmployeeByEmail', verifyToken, employeeController.getCompanyEmployeeByEmail);
router.put('/employee/:id', verifyToken, employeeController.updateCompanyEmployee);
router.delete('/employee/:id', verifyToken, employeeController.deleteCompanyEmployee);

module.exports = router;
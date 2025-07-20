const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../token');

//SERVICIO
const employeeService = require('./employeeService');

//RUTAS

//POSTS
router.post('/employee/register', employeeService.register);
router.post('/employee/login', employeeService.login);
router.post('/employee/logout', verifyToken, employeeService.logout);

//PUTS
router.put('/employee/:employeeId', verifyToken, employeeService.updateCompanyEmployee);

//GETS
router.get('/employee/profile', verifyToken, employeeService.profile);
router.get('/employee/', verifyToken, employeeService.getAllCompanyEmployees);
router.get('/employee/:employeeId', verifyToken, employeeService.getCompanyEmployee);
router.get('/employee/getCompanyEmployeeByEmail/:email', employeeService.getCompanyEmployeeByEmail);

//DELETES
router.delete('/employee/:employeeId', verifyToken, employeeService.deleteCompanyEmployee);
router.delete('/employee/multiple', verifyToken, employeeService.deleteMultipleEmployees);

module.exports = router;
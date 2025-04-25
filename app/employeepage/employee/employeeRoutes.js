const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../token');

//CONTROLADOR
const employeeController = require('./employeeController');

//RUTAS

//POSTS
router.post('/employee/register', employeeController.register);
router.post('/employee/login', employeeController.login);
router.post('/employee/logout', verifyToken, employeeController.logout);

//PUTS
router.put('/employee/:employeeId', verifyToken, employeeController.updateCompanyEmployee);

//GETS
router.get('/employee/profile', verifyToken, employeeController.profile);
router.get('/employee/', verifyToken, employeeController.getAllCompanyEmployees);
router.get('/employee/:employeeId', verifyToken, employeeController.getCompanyEmployee);
router.get('/employee/getCompanyEmployeeByEmail/:email', employeeController.getCompanyEmployeeByEmail);

//DELETES
router.delete('/employee/:employeeId', verifyToken, employeeController.deleteCompanyEmployee);

module.exports = router;
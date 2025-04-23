const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../token');

//CONTROLADOR
const employeeNationalityController = require('./employeeNationalityController');

//RUTAS

//POSTS
router.post('/employeeNationality', verifyToken, employeeNationalityController.createEmployeeNationality);

//PUTS

//GETS
router.get('/employeeNationality', verifyToken, employeeNationalityController.getAllEmployeeNationalities);

//DELETES


module.exports = router;
const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../token');

//SERVICIO
const employeeNationalityService = require('./employeeNationalityService');

//RUTAS

//POSTS
router.post('/employeeNationality', verifyToken, employeeNationalityService.createEmployeeNationality);

//PUTS

//GETS
router.get('/employeeNationality', verifyToken, employeeNationalityService.getAllEmployeeNationalities);

//DELETES


module.exports = router;
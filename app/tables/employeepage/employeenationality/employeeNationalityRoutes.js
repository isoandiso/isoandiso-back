const express = require('express');
const router = express.Router();

// MIDDLEWARE
const { verifyToken } = require('../../../token');

// CONTROLADOR
const employeeNationalityController = require('./employeeNationalityController');

// RUTAS
router.post('/employeeNationality', verifyToken, employeeNationalityController.createEmployeeNationality);
router.get('/employeeNationality', verifyToken, employeeNationalityController.getAllEmployeeNationalities);

module.exports = router;
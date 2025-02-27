const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../../token');

//CONTROLADOR
const subcompanyEmployeeController = require('./subcompanyEmployeeController');

//RUTAS
router.post('/subcompanyEmployee', verifyToken, subcompanyEmployeeController.createSubcompanyEmployee);
router.get('/subcompanyEmployee', verifyToken, subcompanyEmployeeController.getAllSubcompanyEmployees);
router.get('/subcompanyEmployee/:id', verifyToken, subcompanyEmployeeController.getSubcompanyEmployee);
router.delete('/subcompanyEmployee/:id', verifyToken, subcompanyEmployeeController.deleteSubcompanyEmployee);

module.exports = router;
const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../token');

//SERVICIO
const subcompanyEmployeeService = require('./subcompanyEmployeeService');

//RUTAS

//POSTS
router.post('/subcompanyEmployee', verifyToken, subcompanyEmployeeService.createSubcompanyEmployee);

//PUTS

//GETS
router.get('/subcompanyEmployee', verifyToken, subcompanyEmployeeService.getAllSubcompanyEmployees);
router.get('/subcompanyEmployee/:subcompanyEmployeeId', verifyToken, subcompanyEmployeeService.getSubcompanyEmployee);

//DELETES
router.delete('/subcompanyEmployee/:subcompanyEmployeeId', verifyToken, subcompanyEmployeeService.deleteSubcompanyEmployee);

module.exports = router;
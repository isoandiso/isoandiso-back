const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../../token');

//CONTROLADOR
const subcompanyEmployeeController = require('./subcompanyEmployeeController');

//RUTAS

//POSTS
router.post('/subcompanyEmployee', verifyToken, subcompanyEmployeeController.createSubcompanyEmployee);

//PUTS

//GETS
router.get('/subcompanyEmployee', verifyToken, subcompanyEmployeeController.getAllSubcompanyEmployees);
router.get('/subcompanyEmployee/:id', verifyToken, subcompanyEmployeeController.getSubcompanyEmployee);

//DELETES
router.delete('/subcompanyEmployee/:id', verifyToken, subcompanyEmployeeController.deleteSubcompanyEmployee);

module.exports = router;
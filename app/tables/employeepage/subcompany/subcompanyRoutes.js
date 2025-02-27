const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../../token');

//CONTROLADOR
const subcompanyController = require('./subcompanyController');

//RUTAS
router.post('/subcompany', verifyToken, subcompanyController.createSubcompany);
router.get('/subcompany', verifyToken, subcompanyController.getAllSubcompanies);
router.get('/subcompany/:id', verifyToken, subcompanyController.getSubcompany);
router.delete('/subcompany/:id', verifyToken, subcompanyController.deleteSubcompany);

module.exports = router;
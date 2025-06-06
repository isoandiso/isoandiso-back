const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../token');

//CONTROLADOR
const subcompanyController = require('./subcompanyController');

//RUTAS

//POSTS
router.post('/subcompany', verifyToken, subcompanyController.createSubcompany);

//PUTS

//GETS
router.get('/subcompany', verifyToken, subcompanyController.getAllSubcompanies);
router.get('/subcompany/:subcompanyId', verifyToken, subcompanyController.getSubcompany);

//DELETES
router.delete('/subcompany/:subcompanyId', verifyToken, subcompanyController.deleteSubcompany);

module.exports = router;
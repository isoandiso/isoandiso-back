const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../token');

//SERVICIO
const subcompanyService = require('./subcompanyService');

//RUTAS

//POSTS
router.post('/subcompany', verifyToken, subcompanyService.createSubcompany);

//PUTS

//GETS
router.get('/subcompany', verifyToken, subcompanyService.getAllSubcompanies);
router.get('/subcompany/:subcompanyId', verifyToken, subcompanyService.getSubcompany);

//DELETES
router.delete('/subcompany/:subcompanyId', verifyToken, subcompanyService.deleteSubcompany);

module.exports = router;
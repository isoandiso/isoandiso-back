const express = require('express');
const router = express.Router();

// MIDDLEWARE
const { verifyToken } = require('../../../token');

// CONTROLADOR
const companySiteController = require('./companySiteController');

// RUTAS

//POST
router.post('/companySite', verifyToken, companySiteController.createCompanySite);

//PUTS

//GETS
router.get('/companySite', verifyToken, companySiteController.getAllCompanySites);

//DELETES
router.delete('/companySite/:id', verifyToken, companySiteController.deleteCompanySite);

module.exports = router;

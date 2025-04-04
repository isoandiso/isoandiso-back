const express = require('express');
const router = express.Router();

// MIDDLEWARE
const { verifyToken } = require('../../../token');

// CONTROLADOR
const companySiteController = require('./companySiteController');

// RUTAS
router.post('/companySite', verifyToken, companySiteController.createCompanySite);
router.get('/companySite', verifyToken, companySiteController.getAllCompanySites);
router.delete('/companySite/:id', verifyToken, companySiteController.deleteCompanySite);

module.exports = router;

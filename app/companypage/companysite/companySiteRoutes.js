const express = require('express');
const router = express.Router();

// MIDDLEWARE
const { verifyToken } = require('../../token');

// SERVICIO
const companySiteService = require('./companySiteService');

// RUTAS

//POST
router.post('/companySite/:companyId', verifyToken, companySiteService.createCompanySite);

//PUTS

//GETS
router.get('/companySite', verifyToken, companySiteService.getAllCompanySites);

//DELETES
router.delete('/companySite/:companySiteId', verifyToken, companySiteService.deleteCompanySite);

module.exports = router;

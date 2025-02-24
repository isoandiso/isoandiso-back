const express = require('express');
const router = express.Router();

// MIDDLEWARE
const { verifyToken } = require('../../../token');

// CONTROLADOR
const workerNationalityController = require('./workerNationalityController');

// RUTAS
router.post('/workerNationality', verifyToken, workerNationalityController.createWorkerNationality);
router.get('/workerNationality', verifyToken, workerNationalityController.getAllWorkerNationalities);

module.exports = router;
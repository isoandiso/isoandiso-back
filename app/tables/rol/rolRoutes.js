const express = require('express');
const router = express.Router();

// MIDDLEWARE
const { verifyToken } = require('../../token');

// CONTROLADOR
const rolController = require('./rolController');

// RUTAS
router.post('/rol', verifyToken, rolController.createRol);
router.get('/rol', verifyToken, rolController.getAllRoles);

module.exports = router;

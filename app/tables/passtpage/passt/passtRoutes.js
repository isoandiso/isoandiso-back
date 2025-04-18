const express = require('express');
const router = express.Router();


//MIDDLEWARE
const { verifyToken } = require('../../../token');

//CONTROLADOR
const passtController = require('./passtController');

//Rutas
router.post('/passt', verifyToken, passtController.createPasst);
router.get('/passt', verifyToken, passtController.getAllPASSTs);
router.get('/passt/:id', verifyToken, passtController.getPASST);
router.delete('/passt/:id', verifyToken, passtController.getPASST);

module.exports = router;
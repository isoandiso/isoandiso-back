const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../../token');

//CONTROLADOR
const isoController = require('./isoController');

//RUTAS

//POSTS
router.post('/iso', verifyToken, isoController.createIso);
//PUTS

//GETS
router.get('/iso', verifyToken, isoController.getAllIsos);
router.get('/iso/byNameStartWith', verifyToken, isoController.getIsoByNameStartWith);
router.get('/iso/:id', verifyToken, isoController.getIso);

//DELETES
router.delete('/iso/:id', verifyToken, isoController.deleteIso);

module.exports = router;

const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../token');

//SERVICIO
const isoService = require('./isoService');

//RUTAS

//POSTS
router.post('/iso', verifyToken, isoService.createIso);

//PUTS

//GETS
router.get('/iso', verifyToken, isoService.getAllIsos);
router.get('/iso/byNameStartWith', verifyToken, isoService.getIsoByNameStartWith);
router.get('/iso/:isoId', verifyToken, isoService.getIso);

//DELETES
router.delete('/iso/:isoId', verifyToken, isoService.deleteIso);

module.exports = router;

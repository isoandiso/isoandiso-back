const express = require('express');
const router = express.Router();

// MIDDLEWARE
const { verifyToken } = require('../../token');

// SERVICIO
const rolService = require('./rolService');

// RUTAS

//POSTS
router.post('/rol', verifyToken, rolService.createRol);

//PUTS

//GETS
router.get('/rol', verifyToken, rolService.getAllRoles);

//DELETES


module.exports = router;

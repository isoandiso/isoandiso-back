const express = require('express');
const router = express.Router();

// MIDDLEWARE
const { verifyToken } = require('../../token');

// CONTROLADOR
const rolController = require('./rolController');

// RUTAS

//POSTS
router.post('/rol', verifyToken, rolController.createRol);

//PUTS

//GETS
router.get('/rol', verifyToken, rolController.getAllRoles);

//DELETES


module.exports = router;

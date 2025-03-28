const express = require('express');
const router = express.Router();

// MIDDLEWARE
const { verifyCompanyToken } = require('../../../token/verifyToken');

// CONTROLADOR
const rolController = require('./rolController');

// // RUTAS
// router.post('/rol', verifyCompanyToken, rolController.createRol);
// router.get('/rol', verifyCompanyToken, rolController.getAllRoles);

router.post('/rol',  rolController.createRol);
router.get('/rol',  rolController.getAllRoles);

module.exports = router;

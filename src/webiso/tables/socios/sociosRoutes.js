const express = require('express');
const router = express.Router();

//MIDDLEWARE

const sociosController = require('./sociosController');

//RUTAS
router.post('/socios', sociosController.createPartner);
router.get('/socios', sociosController.getAllPartners);
router.get('/socios/:id', sociosController.getAllDetailsOfPartner);

module.exports = router;

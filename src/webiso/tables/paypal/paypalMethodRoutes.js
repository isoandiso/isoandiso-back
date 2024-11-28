const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyCompanyToken } = require('../../../token/verifyToken');

//CONTROLADOR
const paymentsMethodController = require('./paymentsMethodController');

//RUTAS
router.post('/create-payment', verifyCompanyToken, paymentsMethodController.createPaymentMethod);
router.get('/paypal-aproval', verifyCompanyToken, paymentsMethodController.getAllPaymentMethods);
router.get('/paypal-no', verifyCompanyToken, paymentsMethodController.getPaymentMethodById);



module.exports = router;

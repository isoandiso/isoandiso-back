const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyCompanyToken } = require('../../../token/verifyToken');

//CONTROLADOR
const paymentsMethodController = require('./paymentsMethodController');

//RUTAS
router.post('/payments', verifyCompanyToken, paymentsMethodController.createPaymentMethod);
router.get('/payments', verifyCompanyToken, paymentsMethodController.getAllPaymentMethods);
router.get('/payments/:id', verifyCompanyToken, paymentsMethodController.getPaymentMethodById);
router.delete('/payments/:id', verifyCompanyToken, paymentsMethodController.deletePaymentMethodById);

// ... (configurar PayPal)

router.post('/create-payment', async (req, res) => {
    

});

module.exports = router;

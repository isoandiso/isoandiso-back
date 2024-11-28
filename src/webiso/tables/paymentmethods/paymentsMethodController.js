const paymentMethodService = require('./paymentMethodService');
const paypal = require('paypal-rest-sdk');

//Crear methodo de pago
const createPaymentMethod = async (req, res) => {
  try {
    const payment = await paymentMethodService.createPaymentMethod(req);
    res.status(201).json(payment);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando methodo de pago', error: error.message });
  }
};

//Obtener todas methodo de pago
const getAllPaymentMethods = async (req, res) => {
  try {
    const payments = await paymentMethodService.getAllPaymentMethods();
    res.status(200).json(payments);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo los methodos de pagos', error: error.message });
  }
};

//Obtener methodo de pago por ID
const getPaymentMethodById = async (req, res) => {
  try {
    const payment = await paymentMethodService.getPaymentMethodById(req);
    if (!payment) {
      return res.status(404).json({ message: 'Methodo de pago no encontrado' });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el methodo de pago por ID', error: error.message });
  }
};

//Eliminar Methodo de pago por ID
const deletePaymentMethodById = async (req, res) => {
  try {
    await paymentMethodService.deletePaymentMethodById(req);
    res.status(200).json({ message: 'Methodo de pago eliminado satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando methodo de pago por ID', error: error.message });
  }
};


module.exports = {
  createPaymentMethod,
  getAllPaymentMethods,
  getPaymentMethodById,
  deletePaymentMethodById,
};
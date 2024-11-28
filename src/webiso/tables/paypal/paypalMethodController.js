const paypalMethodService = require('./paypalMethodService');


//Crear methodo de pago
const createPaypalMethod = async (req, res) => {
  try {
    const paypal = await paypalMethodService.createPaypalMethod(req);
    res.status(201).json(paypal);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando el pago', error: error.message });
  }
};

module.exports = {
    createPaypalMethod,
  };
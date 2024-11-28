const mongoose = require('mongoose');
const PaypalMethod = require('../paypal/paypalMethodSchema')

const metodoPagoSchema = new mongoose.Schema({
    paymentMethod: {
        type: String,
        enum: ['paypal', 'credit_card'], // Agrega más métodos de pago según sea necesario
        required: true
    },
    paypalTransaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PaypalMethod', // Asume que el esquema de PayPal 
    },
    
});


metodoPagoSchema.pre('save', async function (next) {
    if (this.paymentMethod === 'paypal') {
      
      const paypalData = {
        paypalTransactionId: this.paypalTransactionId, 
        amount: this.amount,
        currency: this.currency,

      };
  
 
      const validationErrors = validatePaymentData(paypalData); 
      if (validationErrors) {
        return next(new Error(`Invalid PayPal data: ${validationErrors}`));
      }
  
        try {
        const paypalPayment = new PaypalMethod(paypalData);
        await paypalPayment.save();
        this.paypalTransaction = paypalPayment._id;
      } catch (err) {
        return next(err); 
      }
    }
  
    next();
  });

const MetodoPago = mongoose.model('metodoPago', metodoPagoSchema);
module.exports = MetodoPago;

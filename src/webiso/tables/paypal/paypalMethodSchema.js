const mongoose = require('mongoose');

const paypalMethodSchema = new mongoose.Schema({
    paypalTransactionId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['completed', 'pending', 'canceled', 'failed'] },
    buyer: {
        paypalId: String,
        email: String
    },
    items: [{
        description: String,
        quantity: Number,
        price: Number
    }],
    paymentMethod: String,
    invoiceId: String,
    notes: String
});

const PaypalMethod = mongoose.model('PaypalMethod', paypalMethodSchema);
module.exports = PaypalMethod;
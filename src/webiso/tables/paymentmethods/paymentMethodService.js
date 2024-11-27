const paymentsMethodSchema = require("./paymentsMethodSchema");

const createPaymentMethod = async (req) => {
  const payment = new paymentsMethodSchema(req.body);
  await payment.save();
  return payment;
};

const getAllPaymentMethods = async () => {
  const payments = await paymentsMethodSchema.find();
  return payments;
};

const getPaymentMethodById = async (req) => {
  const paymentId = req.params.id;
  const payment = await paymentsMethodSchema.findById(paymentId);
  return payment;
};

const deletePaymentMethodById = async (req) => {
  const paymentId = req.params.id;
  await paymentsMethodSchema.findByIdAndDelete(paymentId);
};

module.exports = {
  createPaymentMethod,
  getAllPaymentMethods,
  getPaymentMethodById,
  deletePaymentMethodById,
};

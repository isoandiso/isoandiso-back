const paypalMethodSchema = require("./paypalMethodSchema");
const paypal = require('paypal-rest-sdk');
const PaypalMethod = require('./paymentsMethodSchema');

const createPaypalMethod = async (req) => {
    // const create_payment_json = {
    //     intent: 'sale',
    //     payer: {
    //         payment_method: 'paypal'
    //     },
    //     redirect_urls: {
    //         return_url: 'http://yourreturnurl',
    //         cancel_url: 'http://yourcancelurl'
    //     },
    //     transactions: [{
    //         amount: {
    //             total: '40.00',
    //             currency: 'USD'
    //         },
    //         description: 'Activación por 1 mes'
    //     }]
    // };    

  const create_payment_json = new paypalMethodSchema(req.body);
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        for(let i = 0; i < payment.links.length; i++) {
            if(payment.links[i].rel === 'approval_url') {
                res.redirect(payment.links[i].href);
            }
        }
    }
});

  await paypal.save();
  return paypal;
};


module.exports = {
    createPaypalMethod,
};

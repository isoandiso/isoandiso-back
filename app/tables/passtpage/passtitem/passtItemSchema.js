const mongoose = require('mongoose');

const passtItemSchema = new mongoose.Schema({
    generalObjective: {
        type: String,
        required: true
    },

    specificObjective: {
        type: String,
        required: true
    },

    metas: [{
        type: String,
        required: true,
    }],

    indicators: [{
        type: String,
        required: true,
    }],

    budgets: [{
        type: String,
        required: true,
    }],

    resources: [{
        type: String,
        required: true,
    }],
 
    passtItemActivites: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'passtItemActivity',
            default: null,
            required: true,
        }],
    

});

module.exports = mongoose.model('passtItem', passtItemSchema);
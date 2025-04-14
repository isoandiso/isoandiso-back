const mongoose = require('mongoose');

const passtItemSchema = new mongoose.Schema({
    generalObjectiveId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GeneralObjective',
        default: null
    },

    specificObjectiveId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SpecificObjective',
        default: null
    },

    managementToolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ManagementTool',
        default: null
    },

    activityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity',
        default: null
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

    companyAreaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'companyArea',
        default: null
    },

    charge: {
        type: String,
        required: true,
    },

    companyDestinatedAreaId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'companyArea',
        default: null
    }],

});

module.exports = mongoose.model('passtItem', passtItemSchema);
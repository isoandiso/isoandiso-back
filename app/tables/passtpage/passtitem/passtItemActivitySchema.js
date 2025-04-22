const mongoose = require('mongoose');

const passtItemActivitySchema = new mongoose.Schema({
    managementToolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ManagementTool',
        required: true
    },

    activityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity',
        required: false
    },

    activityText: {
        type: String,
        required: false
    },
    
    companyAreaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'companyArea',
        default: null,
        required: true,
    },

    charge: {
        type: String,
        required: true,
    },

    companyDestinatedAreaId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'companyArea',
        default: null,
        required: true,
    }],

    mounthsForExecute: [{
        type:Number,
        min: 1,
        max:12,
        required:true
    }
    ],

    mounthsExecuted: [{
        type:Number,
        min: 1,
        max:12,
        required:false
    }
    ]
});

module.exports = mongoose.model('passtItemActivity', passtItemActivitySchema);
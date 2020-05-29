const mongoose = require('mongoose');
const schema = mongoose.Schema;

const complaintSchema = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    roll: {
        type: String,
        required: true  
    },
    department: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    dateCreated: {
        type: String,
        required: true
    },
    resolved: {
        type: Boolean,
        default: false
    },
    dateResolved: {
        type: String,
        default: ''
    },
    resolveMessage: {
        type: String,
        default: ''
    }
});

const complaintModel = mongoose.model('complaints', complaintSchema);

module.exports = complaintModel;
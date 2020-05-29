const mongoose = require('mongoose');
const schema = mongoose.Schema;

const staffSchema = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    staffId: {
        type: String,
        default: ''
    },
    department: {
        type: String,
        default: ''
    },
    college: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    }
});

const staffModel = mongoose.model('staffs', staffSchema);
module.exports = staffModel;
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const studentSchema = new schema({
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
    roll: {
        type: String,
        default: ''
    },
    dob: {
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

const studentModel = mongoose.model('allStudents', studentSchema);
module.exports = studentModel;
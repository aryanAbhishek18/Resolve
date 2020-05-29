const express = require('express');
const studentModel = require('../models/student');
const staffModel = require('../models/staff');
const complaintModel = require('../models/complaint');
const jwtVerify = require('../utils/jwtVerify');
const bcryptHash = require('../utils/bcryptHash');

const router = express.Router();

router.post('/postComplaint', async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.json({
                status: 403,
                message: 'Token missing!!'
            });
        }

        const name = req.body.name;
        if (!name) {
            return res.json({
                status: 403,
                message: 'Name missing!!'
            });
        }

        const email = req.body.email;
        if (!email) {
            return res.json({
                status: 403,
                message: 'Email missing!!'
            });
        }

        const roll = req.body.roll;
        if (!roll) {
            return res.json({
                status: 403,
                message: 'Roll missing!!'
            });
        }

        const department = req.body.department;
        if (!department) {
            return res.json({
                status: 403,
                message: 'Department missing!!'
            });
        }

        const subCategory = req.body.subCategory;
        if (!subCategory) {
            return res.json({
                status: 403,
                message: 'Sub Category missing!!'
            });
        }

        const college = req.body.college;
        if (!college) {
            return res.json({
                status: 403,
                message: 'College missing!!'
            });
        }

        const message = req.body.message;
        if (!message) {
            return res.json({
                status: 403,
                message: 'Message missing!!'
            });
        }

        const dateCreated = new Date().toDateString();

        const newComplaint = await complaintModel.create({
            name: name,
            email: email,
            roll: roll,
            department: department,
            subCategory: subCategory,
            college: college,
            message: message,
            dateCreated: dateCreated
        });

        return res.json({
            status: 200,
            message: "Complaint saved successfully!"
        });


    } catch (e) {
        console.log(e);
        return res.json({
            status: 500,
            message: 'Internal server error!'
        });
    }
});



router.post('/getComplaints', async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.json({
                status: 403,
                message: 'Token missing!!'
            });
        }

        const userMongoId = await jwtVerify(token);

        const user = await studentModel.findById(userMongoId);

        if(!user.email){
            return res.json({
                status: 500,
                message: 'Error in fetching complaints!'
            });
        }
        const email = user.email;

        const complaints = await complaintModel.find({email: email});

        return res.json({
            status: 200,
            message: "Complaints retrieved successfully!",
            complaints: complaints
        });


    } catch (e) {
        console.log(e);
        return res.json({
            status: 500,
            message: 'Internal server error!'
        });
    }
});



router.post('/getPendingComplaints', async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.json({
                status: 403,
                message: 'Token missing!!'
            });
        }


        const pendingComplaints = await complaintModel.find({resolved: false});

        return res.json({
            status: 200,
            message: "Pending Complaints retrieved successfully!",
            pendingComplaints: pendingComplaints
        });


    } catch (e) {
        console.log(e);
        return res.json({
            status: 500,
            message: 'Internal server error!'
        });
    }
});



router.post('/resolveComplaint', async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.json({
                status: 403,
                message: 'Token missing!!'
            });
        }

        const id = req.body.id;
        if (!id) {
            return res.json({
                status: 403,
                message: 'Complaint id missing!!'
            });
        }

        const resolveMessage = req.body.resolveMessage;
        if (!resolveMessage) {
            return res.json({
                status: 403,
                message: 'Resolve message missing!!'
            });
        }

        const dateResolved = new Date().toDateString();

        await complaintModel.findByIdAndUpdate(id, {$set: {
            'resolved': true,
            'resolveMessage': resolveMessage,
            'dateResolved': dateResolved
        }});

        return res.json({
            status: 200,
            message: "Complaint resolved successfully!"
        });


    } catch (e) {
        console.log(e);
        return res.json({
            status: 500,
            message: 'Internal server error!'
        });
    }
});



module.exports = router;
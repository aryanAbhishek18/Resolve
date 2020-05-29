const express = require('express');
const studentModel = require('../models/student');
const staffModel = require('../models/staff');
const jwtVerify = require('../utils/jwtVerify');
const bcryptHash = require('../utils/bcryptHash');

const router = express.Router();

router.post('/getProfile', async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.json({
                status: 403,
                message: 'Token missing!!'
            });
        }

        const category = req.body.category;
        if (!category) {
            return res.json({
                status: 400,
                message: 'Bad request!!'
            });
        }

        const userMongoId = await jwtVerify(token);
        if (!userMongoId) {
            return res.json({
                status: 500,
                message: 'Internal server error while verifying the token!!'
            });
        }

        if (category === 'student') {
            const user = await studentModel.findById(userMongoId);
            if (!user) {
                return res.json({
                    status: 401,
                    message: 'Invalid user id!!'
                });
            }

            return res.json({
                status: 200,
                message: 'User found!',
                user: user
            });
        }

        else if (category === 'administration') {
            const user = await staffModel.findById(userMongoId);
            if (!user) {
                return res.json({
                    status: 401,
                    message: 'Invalid user id!!'
                });
            }

            return res.json({
                status: 200,
                message: 'User found!',
                user: user
            });
        }

        else {
            return res.json({
                status: 400,
                message: 'Bad request!!'
            });
        }


    } catch (e) {
        return res.json({
            status: 500,
            message: 'Internal server error!'
        });
    }
});




router.post('/changePassword', async (req, res, next) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.json({
                status: 403,
                message: 'Token missing!!'
            });
        }

        const newPass = req.body.password;
        if (!newPass) {
            return res.json({
                status: 401,
                message: 'New password missing!!'
            });
        }

        const category = req.body.category;
        if (!category) {
            return res.json({
                status: 400,
                message: 'Bad request!!'
            });
        }

        next();
    } catch (e) {
        return res.json({
            status: 500,
            message: 'Internal1 server error!!'
        });
    }
}, bcryptHash, async (req, res) => {
    try {
        const newHashedPassword = req.hashedPassword;
        const userMongoId = await jwtVerify(req.body.token);
        const category = req.body.category;
        if (!userMongoId) {
            return res.json({
                status: 500,
                message: 'Internal server error while verifying the token!!'
            });
        }


        if (category === 'student') {
            const updatedUser = await studentModel.findOneAndUpdate({
                _id: userMongoId
            }, {
                password: newHashedPassword
            });
            if (updatedUser) {
                return res.json({
                    status: 200,
                    message: 'Password updated successfully!!'
                });
            } else {
                return res.json({
                    status: 500,
                    message: 'Internal2 server error!!'
                });
            }
        }

        else if (category === 'administration') {
            const updatedUser = await staffModel.findOneAndUpdate({
                _id: userMongoId
            }, {
                password: newHashedPassword
            });
            if (updatedUser) {
                return res.json({
                    status: 200,
                    message: 'Password updated successfully!!'
                });
            } else {
                return res.json({
                    status: 500,
                    message: 'Internal2 server error!!'
                });
            }
        }

        else {
            return res.json({
                status: 400,
                message: 'Bad request!!'
            });
        }

    } catch (e) {
        return res.json({
            status: 500,
            message: 'Internal3 server error!!'
        });
    }
});





router.post('/updateProfile', async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.json({
                status: 403,
                message: 'Token missing!!'
            });
        }

        const userMongoId = await jwtVerify(token);
        if (!userMongoId) {
            return res.json({
                status: 500,
                message: 'Internal server error while verifying the token!!'
            });
        }

        const category = req.body.category;
        if (!category) {
            return res.json({
                status: 400,
                message: 'Bad request!!'
            });
        }

        const department = req.body.department;
        const college = req.body.college;
        const address = req.body.address;
        const phone = req.body.phone;


        if (category === 'student') {
            const roll = req.body.roll;
            const dob = req.body.dob;
            const updatedUser = await studentModel.findByIdAndUpdate(userMongoId, {
                $set: {
                    roll: roll,
                    dob: dob,
                    department: department,
                    college: college,
                    address: address,
                    phone: phone
                }
            });

            return res.json({
                status: 200,
                message: 'User details updated successfully!'
            });
        }

        else if (category === 'administration') {
            const staffId = req.body.staffId;
            const updatedUser = await staffModel.findByIdAndUpdate(userMongoId, {
                $set: {
                    staffId: staffId,
                    department: department,
                    college: college,
                    address: address,
                    phone: phone
                }
            });

            return res.json({
                status: 200,
                message: 'User details updated successfully!'
            });
        }

        else {
            return res.json({
                status: 400,
                message: 'Bad request!!'
            });
        }

    } catch (e) {
        return res.json({
            status: 500,
            message: 'Internal server error!'
        });
    }
});

module.exports = router;
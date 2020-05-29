const express = require('express');
const router = express.Router();

const authenticate = require('./authenticate');
const profile = require('./profile');
const complaint = require('./complaint');


router.use('/authenticate', authenticate);
router.use('/profile', profile);
router.use('/complaint', complaint);


module.exports = router;
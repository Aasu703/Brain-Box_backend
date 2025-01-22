const express = require('express');
const router = express.Router();
const { getUser, createUser } = require('../controller/Usercontroller');

router.get('/users', getUser); // Route to fetch all users
router.post('/users', createUser); // Route to create a user

module.exports = router;

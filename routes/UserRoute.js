const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');

// POST route for user signup
router.post('/signup', UserController.signup);

// POST route for user login
router.post('/login', UserController.login);

// Existing routes
router.post('/users', UserController.createUser);
router.get('/users', UserController.getUsers);

module.exports = router;
const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');

router.post('/users', UserController.createUser);
router.get('/users', UserController.getUsers);

module.exports = router;
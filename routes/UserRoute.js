const express = require('express');
const router = express.Router();
const Usercontroller = require('../controller/Usercontroller');

router.get('/users',Usercontroller. getUser); // Route to fetch all users
router.post('/create',Usercontroller. createUser); // Route to create a user

router.put('/:id',Usercontroller.updateUser)
router.delete('/:id',Usercontroller.deleteUser)

module.exports = router;

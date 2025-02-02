const express = require('express');
const router = express.Router();
const Usercontroller = require('../controller/Usercontroller');

router.post('/login', Usercontroller.loginUser);
router.post('/signup', Usercontroller .registerUser);

// router.get('/Users',Usercontroller. getUser); // Route to fetch all users
// router.post('/Users',Usercontroller. createUser); // Route to create a user

// router.put('/:id',Usercontroller.updateUser)
// router.delete('/:id',Usercontroller.deleteUser)

module.exports = router;

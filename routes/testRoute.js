//Import the express library
const express = require('express')
const router = express.Router();
const testController = require('../controller/testcontroller');

router.post('/create_test', testController.createTest);
router.get('/show_test', testController.getTest);
module.exports = router;


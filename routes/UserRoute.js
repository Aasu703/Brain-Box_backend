const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController"); // Ensure correct path
const authMiddleware = require("../middleware/auth"); // Ensure correct path

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.get("/users", authMiddleware, UserController.getUsers); // Make sure `getUsers` is defined

module.exports = router;

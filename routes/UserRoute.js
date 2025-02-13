const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");
const authMiddleware = require("../middleware/auth");

// 🔹 Public Routes
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);

// 🔹 Protected Routes (Require JWT)
router.get("/users", authMiddleware, UserController.getUsers);

module.exports = router;

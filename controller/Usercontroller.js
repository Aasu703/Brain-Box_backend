const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body; // ✅ Use correct lowercase column names

        // 🔹 Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // 🔹 Create new user
        const user = await User.create({ name, email, password });

        // 🔹 Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({ message: "User created successfully", token, user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 🔹 Login Function
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body; // ✅ Use correct lowercase column names

        // 🔹 Check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 🔹 Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 🔹 Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 🔹 Get All Users (Protected Route)
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: ["id", "name", "email"] });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

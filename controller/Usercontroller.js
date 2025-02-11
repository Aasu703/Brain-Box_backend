const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res) => {
    try {
        const { Email, Password, Role } = req.body;
        const user = await User.create({ Email, Password, Role });

        // Generate JWT token with user details
        const token = jwt.sign(
            { id: user.User_ID, email: user.Email, role: user.Role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ message: 'User created successfully', token, user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Importing the model
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register a new user
const registerUser = async (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create the user
        const newUser = await User.create({ username, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register user' });
    }
};


// Login an existing user
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        // Find the user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET || 'JKHSDKJBKJSDJSDJKBKSD345345345345',
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user.id, username: user.username }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to login user' });
    }
};




// // Function to get all test users
// const getUser = async (req, res) => {
//     try {
//         const users = await User.findAll(); // Fetch all users
//         res.status(200).json(users); // Return as JSON
//         console.log('Retrieved all test users');
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to retrieve test data' });
//     }
// };

// // Function to create a test user
// const createUser = async (req, res) => {
//     try {
//         const { name, email, password } = req.body; // Extract data from request
//         const newUser = await User.create({ name, email, password }); // Create user
//         res.status(200).json(newUser); // Return created user
//         console.log('New test user created');
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to create test user' });
//         console.log(error)
//     }
// };

// const updateUser = async(req, res)=>{
//     try{
//         const User = await User.findByPk(req.params.id);
//         if (!User) {
//             return res.status(404).json({ message: 'User not found'});
//         }
//         await User.update(req.body);
//         res.json(User);
//     } catch (err) {
//         res.status(400).json({ error: err.message});
//     }
// }

// const deleteUser = async(req, res)=>{
//     try {
//         const User = await User.findByPk(req.params.id);
//         if (!User) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         await User.destroy();
//         res.json({ message: 'User deleted' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// }


// // Export functions for routes
// module.exports = { getUser, createUser, updateUser, deleteUser };
module.exports = { loginUser, registerUser };
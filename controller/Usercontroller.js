// Importing the model
const User = require('../models/User');

// Function to get all test users
const getUser = async (req, res) => {
    try {
        const users = await User.findAll(); // Fetch all users
        res.status(200).json(users); // Return as JSON
        console.log('Retrieved all test users');
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve test data' });
    }
};

// Function to create a test user
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body; // Extract data from request
        const newUser = await User.create({ name, email, password }); // Create user
        res.status(200).json(newUser); // Return created user
        console.log('New test user created');
    } catch (error) {
        res.status(500).json({ error: 'Failed to create test user' });
        console.log(error)
    }
};

const updateUser = async(req, res)=>{
    try{
        const User = await User.findByPk(req.params.id);
        if (!User) {
            return res.status(404).json({ message: 'User not found'});
        }
        await User.update(req.body);
        res.json(User);
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
}

const deleteUser = async(req, res)=>{
    try {
        const User = await User.findByPk(req.params.id);
        if (!User) {
            return res.status(404).json({ message: 'User not found' });
        }
        await User.destroy();
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// Export functions for routes
module.exports = { getUser, createUser, updateUser, deleteUser };

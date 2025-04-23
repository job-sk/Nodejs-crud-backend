const User = require('../models/userModel');

// GET all users
const getUsers = async (req, res) => {
    console.log('API - Get all users');
    
    const users = await User.find();
    res.json(users);
};

// POST create new user
const createUser = async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }

    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user);
};

// PUT update user
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
  
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
  
    user.name = name || user.name;
    user.email = email || user.email;
  
    const updatedUser = await user.save();
    res.json(updatedUser);
};

// DELETE user
const deleteUser = async (req, res) => {
    const { id } = req.params;
  
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
  
    await user.deleteOne();
    res.json({ message: 'User deleted' });
};
  
module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
  };
  
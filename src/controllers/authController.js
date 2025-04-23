const User = require('../models/authModel');

const userSignup = async (req, res) => {
    const { username, password, email } = req.body;
    if(!username || !password || !email) {
        res.status(400);
        throw new Error('All fields are required');
    }

    const availableUser = await User.findOne({ email });
    if(availableUser) {
        res.status(400);
        throw new Error('User already exists');
    }
    //todo: continue with jwt and bycrypt
    const users = await User.find();
    res.json(users);
};


module.exports = {
    userSignup
  };
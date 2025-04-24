const User = require('../models/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

    //hash password
    const hashPassword = await bcrypt.hash(password, 10);
    console.log("hashPassword:",hashPassword);

    const user = await User.create({
        username,
        password: hashPassword,
        email
    });
    console.log("user:",user);

    if(user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email
        });
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
};

//login user
const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error('All fields are required');
    }
    const user = await User.findOne({ email });
    //compare password
    if(!user) {
        res.status(401);
        throw new Error('User not found');
    }else if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        res.json({ accessToken });
    }else{
        res.status(401);
        throw new Error('Email or password is not valid');
    }
};


module.exports = {
    userSignup,
    userLogin
  };
const express = require('express');
const router = express.Router();
const {
    userSignup
  } = require('../controllers/authController');



router.post('/sign-up', userSignup);        // POST /api/sign-up
// router.post('/login', userLogin);           // POST /api/login


module.exports = router;
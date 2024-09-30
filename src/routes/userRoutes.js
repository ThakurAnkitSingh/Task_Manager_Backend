const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser, ProfileUser } = require('../controllers/userController');
const { userAuth } = require('../helper/middleware');

router.get('/userAuth', userAuth, getUser); // Get user details
router.post('/register', registerUser); // Register a new user by email and password
router.post('/login', loginUser); // Login user by email and password
router.post('/updateProfile', userAuth, ProfileUser); // Login user by email and password

module.exports = router;
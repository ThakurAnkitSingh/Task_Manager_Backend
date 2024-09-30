// src/routes/authRoutes.js
const express = require('express');
const admin = require('../config/firebaseAdmin');
const db = require('../config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const router = express.Router();

// Endpoint to verify Google ID token and create user in database
router.post('/googleAuth', async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const { uid: google_id, email, name } = decodedToken;

        // Check if the user already exists
        let user = await db('users').where({ email }).first();
        if (!user) {
            // User does not exist, create a new user
            user = {
                name,
                email,
                google_id,
                password: null,
            };
        } else {
            user.password = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
        }

        // Send the user information as a response
        return res.status(200).json({ user });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
});

module.exports = router;
// src/services/userService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const db = require('../config/db');

const UserAuthorization = async (email, userId) => {
    try {
        if (!email && !userId) {
            return res.status(400).json({ message: 'Email not found' });
        }
        if (!email && userId) {
            const res = await User.findById(userId);
            return res;
        }
        const existingUser = await User.findByEmail(email);
        if (!existingUser) throw new Error('User not found');
        return existingUser;
    } catch (error) {
        throw new Error(error.message || 'Error authorizing user');
    }
};

const setUserProfileUrl = async (ProfileUrl, UserId) => {
    try {
        if (!ProfileUrl) {
            return res.status(400).json({ message: 'Url not found' });
        }
        const updatingUser = await User.update(UserId, { avatar: ProfileUrl });
        return updatingUser;
    } catch (error) {
        throw new Error(error.message || 'Error updating user');
    }
};

const setUserPassword = async (email, password) => {
    try {
        if (!email) {
            return res.status(400).json({ message: 'Email not found' });
        }

        const existingUser = await User.findByEmail(email);
        if (!existingUser) throw new Error('User not found');
        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10); // Use bcrypt to hash the password

        // Update the user's password in the database
        existingUser.password = hashedPassword;
        await existingUser.save(); // Save the updated user record
        return existingUser;
    } catch (error) {
        throw new Error(error.message || 'Error authorizing user');
    }
};

const registerUser = async (name, email, password, google_id) => {
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }
        const existingUser = await User.findByEmail(email);

        if (existingUser) throw new Error('User already exists');

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword, google_id });
        const createdUser = await User.findByEmail(email);
        const token = jwt.sign({ userId: createdUser.id }, process.env.JWT_SECRET);
        return token;
    } catch (error) {
        console.log(error, " Catch block")
        throw new Error(error.message || 'Error registering user');
    }
};

const loginUser = async (email, password) => {
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = await User.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
        return token;
    } catch (error) {
        throw new Error(error.message || 'Error logging in');
    }
};

module.exports = {
    registerUser,
    loginUser,
    UserAuthorization,
    setUserPassword,
    setUserProfileUrl,
};

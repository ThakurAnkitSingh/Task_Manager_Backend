// src/models/userModel.js
const db = require('../config/db');

const User = {
  findByEmail: (email) => db('users').where({ email }).first(),
  create: (user) => db('users').insert(user),
  update: (id, userData) => db('users').where({ id }).update(userData), // Update user details
  findById: (id) => db('users').where({ id }), // Find by Id user details
};

module.exports = User;

// Helper Functions
const helpers = {
  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  validatePassword: (password) => {
    return password && password.length >= 6;
  },

  generateToken: (userId) => {
    const jwt = require('jsonwebtoken');
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
  },

  hashPassword: async (password) => {
    // TODO: Implement password hashing using bcrypt
    return password;
  },

  comparePassword: async (password, hash) => {
    // TODO: Implement password comparison
    return password === hash;
  }
};

module.exports = helpers;

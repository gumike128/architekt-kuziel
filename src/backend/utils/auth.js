const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');

// Authentication middleware
const authMiddleware = async (req, res, next) => {
  // Get token from header
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    // Extract token (remove "Bearer " prefix)
    const token = authHeader.split(' ')[1];
    
    if (token) {
      try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_here');
        
        // Add user to request object
        req.user = decoded;
      } catch (err) {
        // Token is invalid
        console.error('Invalid token:', err.message);
      }
    }
  }
  
  next();
};

// Apollo Server context function
const context = async ({ req }) => {
  // Return user from request (set by authMiddleware)
  return { user: req.user };
};

module.exports = {
  authMiddleware,
  context
};

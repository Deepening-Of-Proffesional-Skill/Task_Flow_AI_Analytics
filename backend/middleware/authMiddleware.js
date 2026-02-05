// backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      error: 'Access token required',
      message: 'No authentication token provided'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        error: 'Invalid or expired token',
        message: 'Authentication token is invalid'
      });
    }
    req.user = user;
    next();
  });
};

export const validateTaskPayload = (req, res, next) => {
  const { title, priority, deadline, description, status } = req.body;
  
  // Basic validation
  if (title && typeof title !== 'string') {
    return res.status(400).json({
      error: 'Validation failed',
      message: 'Title must be a string'
    });
  }

  if (description && typeof description !== 'string') {
    return res.status(400).json({
      error: 'Validation failed',
      message: 'Description must be a string'
    });
  }

  if (priority !== undefined && typeof priority !== 'number') {
    return res.status(400).json({
      error: 'Validation failed',
      message: 'Priority must be a number'
    });
  }

  if (deadline && isNaN(Date.parse(deadline))) {
    return res.status(400).json({
      error: 'Validation failed',
      message: 'Invalid date format'
    });
  }

  if (status && !['pending', 'in_progress', 'completed'].includes(status)) {
    return res.status(400).json({
      error: 'Validation failed',
      message: 'Invalid status value'
    });
  }

  next();
};

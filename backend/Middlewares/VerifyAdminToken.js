const jwt = require('jsonwebtoken');

/**
 * Middleware to verify JWT token in the Authorization header.
 * Attaches decoded admin payload to req.admin if valid.
 */
const verifyAdminToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        Success: false,
        Message: 'Access denied. No authentication token provided.',
      });
    }

    const token = authHeader.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      console.error('JWT Configuration Error: JWT_SECRET is not configured in environment variables.');
      return res.status(500).json({
        Success: false,
        Message: 'Internal server authentication error.',
      });
    }

    const decoded = jwt.verify(token, jwtSecret);
    req.admin = decoded; // Contains id, AdminID
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        Success: false,
        Message: 'Authentication session expired. Please log in again.',
      });
    }

    return res.status(401).json({
      Success: false,
      Message: 'Invalid authentication token.',
    });
  }
};

module.exports = verifyAdminToken;

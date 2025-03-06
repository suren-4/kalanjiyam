const jwt = require('jsonwebtoken');

// Authentication middleware
const requireAuth = (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    
    // Add user data to request
    req.user = decoded;
    
    // In the actual implementation, this is handled by Supabase Auth:
    // The client includes the Supabase JWT in requests, and Supabase handles verification
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = {
  requireAuth
}; 
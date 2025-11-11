const jwt = require('jsonwebtoken');

// Verify JWT Token
exports.verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      success: false,
      message: 'Access denied. No token provided.' 
    });
  }
  
  const token = authHeader.replace('Bearer ', '');
  
  try {
    const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key-change-in-production';
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token expired. Please login again.' 
      });
    }
    return res.status(401).json({ 
      success: false,
      message: 'Invalid token.' 
    });
  }
};

// Role-Based Access Control
exports.authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        message: 'Unauthorized access' 
      });
    }
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false,
        message: `Access forbidden. Only ${allowedRoles.join(', ')} can access this resource.` 
      });
    }
    
    next();
  };
};

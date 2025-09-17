const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    res.status(401); throw new Error('Not authorized, token missing');
  }
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    req.user = { email: decoded.email, role: decoded.role || 'user' };
    next();
  } catch (err) {
    res.status(401); throw new Error('Not authorized, token invalid');
  }
});

module.exports = { protect };

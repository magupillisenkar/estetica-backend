const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

// Static admin credentials
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '123456';

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' });
};

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    res.status(400);
    throw new Error('email and password required');
  }

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = generateToken({ email, role: 'admin' });
    return res.json({ user: { email, role: 'admin' }, token });
  }

  res.status(401);
  throw new Error('Invalid credentials');
});

module.exports = { login };

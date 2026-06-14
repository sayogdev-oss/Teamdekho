const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'teamdekho_jwt_secret_2026';

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      plan_id: user.plan_id || 1,
      personal_meeting_id: user.personal_meeting_id,
      personal_room_slug: user.personal_room_slug,
      room_slug: user.personal_room_slug
    },
    JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION || '7d' }
  );
}

function verifyToken(req, res, next) {
  const token = req.cookies?.td_token || req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

function isHost(req, res, next) {
  const token = req.cookies?.td_token;
  if (!token) {
    if (req.xhr || req.headers.accept?.includes('application/json')) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    return res.redirect('/host/login');
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (req.xhr || req.headers.accept?.includes('application/json')) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    return res.redirect('/host/login');
  }
}

module.exports = { generateToken, verifyToken, isHost };

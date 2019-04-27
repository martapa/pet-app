// Import internal dependencies
const jwt = require('jsonwebtoken');
const  SECRET = process.env.SECRET || 'super-secret-passphrase'

// Create JWT token with user id in payload
exports.create = shelter => {
  const { _id: id } = shelter;
  const payload = {
    shelter: {
      id
    }
  };

  return jwt.sign(payload, SECRET, { expiresIn: '1 day' });
};

// Verify JWT token
exports.verify = token => {
  return jwt.verify(token, SECRET);
};

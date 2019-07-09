const jwt = require('jsonwebtoken');
const { SECRET } = require('./constants');

exports.generateToken = shelter => {
  const { _id: id } = shelter;
  const payload = {
    shelter: {
      id
    }
  };

  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
};

exports.verifyToken = token => {
  return jwt.verify(token, SECRET);
};

// Import internal dependencies
const tokenService = require('../utils/tokenService');
const { HTTP401Error } = require('../utils/httpErrors');

// Verify the JWT token passed in the request authorization header and add the
// decoded payload to the request
module.exports = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  try {
    if (authHeader) {
      const [prefix, token] = authHeader.split(' ');

      try {
        const decoded = tokenService.verify(token);
        req.token = decoded;

        next();
      } catch (e) {
        throw new HTTP401Error();
      }
    } else {
      throw new HTTP401Error();
    }
  } catch (e) {
    // Refactor this
    res.status(e.statusCode).json({
      message: e.message,
      errors: [e]
    });
  }
};

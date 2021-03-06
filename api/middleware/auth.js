const { HTTP401Error } = require('../utils/httpErrors');
const tokenService = require('../utils/tokenService');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');

  try {
    if (!authHeader) throw new HTTP401Error();

    const [prefix, token] = authHeader.split(' ');

    try {
      const decoded = tokenService.verifyToken(token);
      req.token = decoded;

      next();
    } catch (e) {
      throw new HTTP401Error();
    }
  } catch (e) {
    next(e);
  }
};

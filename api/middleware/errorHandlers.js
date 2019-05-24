// Import internal dependencies
const ErrorHandler = require('../utils/errorHandler');

// Handle not found error
const handleNotFoundError = (exports.handleNotFoundError = router => {
  router.use((req, res) => {
    ErrorHandler.notFoundError();
  });
});

// Handle client error
const handleClientError = (exports.handleClientError = router => {
  router.use(ErrorHandler.clientError);
});

// Handle server error
const handleServerError = (exports.handleServerError = router => {
  router.use((err, req, res, next) => {
    ErrorHandler.serverError(err, res, next);
  });
});

// Module exports
module.exports = [handleNotFoundError, handleClientError, handleServerError];

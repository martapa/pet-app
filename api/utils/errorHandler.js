// Import internal dependencies
const { HTTPClientError, HTTP404Error } = require('./httpErrors');

// Handle client error
exports.clientError = (err, res, next) => {
  console.log("")
  if (err instanceof HTTPClientError) {
    console.warn(err);

    res.status(err.statusCode).send(err.message);
    // res.status(err.statusCode).json({
    //   message: err.message,
    //   errors: [err]
    // });
  } else {
    next(err);
  }
};

// Handle not found error
exports.notFoundError = () => {
  throw new HTTP404Error('Method Not Found');
};

// Handle server error
exports.serverError = (err, res, next) => {
  console.error(err);

  if (process.env.NODE_ENV === 'production')
    res.status(500).send('Internal Server Error');
  else res.status(500).send(err.stack);
};

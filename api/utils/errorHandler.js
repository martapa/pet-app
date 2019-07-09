const { HTTP404Error, HTTPClientError } = require('./httpErrors');

exports.clientError = (err, req, res, next) => {
  if (err instanceof HTTPClientError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    next(err);
  }
};

exports.notFoundError = () => {
  throw new HTTP404Error('Method Not Found');
};

exports.serverError = (err, res, next) => {
  console.error(err);

  if (process.env.NODE_ENV === 'production') {
    res.status(500).send({ error: 'Internal Server Error' });
  } else {
    res.status(500).send(err.stack);
  }
};

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const router = express();
const errorHandlers = require('./middleware/errorHandlers');
const path = require('path');

const { PORT, MONGODB_URI } = require('./utils/constants');

const { applyMiddleware } = require('./utils');
const middleWare = require('./middleware');

const { router: shelterRouter } = require('./routes/shelter/shelterRouter');
const { router: petRouter } = require('./routes/pet/petRouter');
const { router: geocodeRouter } = require('./routes/geocode/geocodeRouter');

applyMiddleware(middleWare, router);

router.use('/shelters', shelterRouter);
router.use('/pets', petRouter);
router.use('/geocode', geocodeRouter);


// 1. Change route handler to return static folder
const publicFolder = path.resolve(__dirname, '..', 'build');
router.use('/', express.static(publicFolder)); //want to serve that static content

// 2. Add route handler to catch all requests

router.use('*', (req, res, next) => {
  const indexFile = path.resolve(publicFolder, 'index.html');
  res.sendFile(indexFile);
});

applyMiddleware(errorHandlers, router);

const server = http.createServer(router);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true }).then(async () => {
  console.log(`Connected to database at: ${MONGODB_URI}`);
  try {
    //await require('./utils/seed').truncate();
    //await require('./utils/seed').seed();

    server.listen(PORT, () => {
      console.log(`Server is running on PORT:${PORT}`);
      if (process.send) {
        // NOTE: process is being run by pm2
        process.send('ready');
      }
    });
  } catch (e) {
    console.error(`Error starting server: ${e}`);
    throw e;
  }
});
// .catch (e) {
//   console.log(e);
// }

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const router = express();
const errorHandlers = require('./middleware/errorHandlers');
const path = require('path');

const PORT = process.env.PORT || 3001;
const URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/pets_project';
//const KEY = process.env.GOOGLE_KEY || 'key'

//const PORT = 3001;
//const URL = 'mongodb://localhost:27017/pets_project';

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

mongoose.connect(URL, { useNewUrlParser: true }).then(async () => {
  console.log(`Connected to database at: ${URL}`);
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

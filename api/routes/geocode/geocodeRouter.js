const express = require('express');
require('dotenv').config()

//initiate a router
const router = express.Router();
const { ClientError } = require('../../utils/errors');

const axios = require('axios');


const API_KEY = process.env.GOOGLE_KEY || process.env.ENV_GOOGLE_KEY
//console.log("here",process.env.ENV_GOOGLE_KEY)

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      console.log("process.env.GOOGLE_KEY", process.env.GOOGLE_KEY)
      console.log("process.env.ENV_GOOGLE_KEY", process.env.ENV_GOOGLE_KEY)

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=,+${
          req.query.address
        }&key=${API_KEY}`
      );

      res.status(200).send({
        data: [response.data]
      });
    } catch (err) {
      next(err);
    }
  });

exports.router = router;

const express = require('express');
const axios = require('axios');

const { HTTP400Error } = require('../../utils/httpErrors');
const { ENV_GOOGLE_KEY } = require('../../utils/constants');

const router = express.Router();

router.route('/').get(async (req, res, next) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=,+${
        req.query.address
      }&key=${ENV_GOOGLE_KEY}`
    );

    if (response.data.status === 'ZERO_RESULTS') {
      throw new HTTP400Error('No address found');
    } else {
      res.status(200).send({
        data: [response.data]
      });
    }
  } catch (err) {
    next(err);
  }
});

exports.router = router;

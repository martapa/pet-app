const express = require('express');

//initiate a router
const router = express.Router();
const shelterService = require('./shelterService');
const petService = require('../pet/petService');
const tokenService = require('../../utils/tokenService');
const { ClientError } = require('../../utils/errors');
const requiresAuth = require('../../middleware/auth');
const Shelter = require('./shelterModel');

const _ = require('lodash');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const shelters = await shelterService.getAllShelters();
      res.status(200).send({
        data: [shelters]
      });
    } catch (err) {
      next(err);
    }
  }) //edit shelter when shelter is logged in
  .patch(requiresAuth, async (req, res, next) => {
    const id = req.token.shelter.id;
    try {
      // if (!id) {
      //   res.status(400).json({ error: { message: "id must be provided"}});
      //   return;
      // } it can be like this instead of middleWare
      const shelter = await shelterService.updateShelter(id, req.body);
      res.status(200).send({
        data: [shelter]
      });
    } catch (err) {
      next(err);
    }
  }) //delete shelter when shelter is logged in
  .delete(requiresAuth, async (req, res, next) => {
    const id = req.token.shelter.id;
    try {
      const shelter = await shelterService.getShelterById(id);
      const pets_ids = shelter.pets;
      await shelterService.deleteShelter(id);
      const removing = await Promise.all(
        _.map(pets_ids, async id => {
          await petService.deletePet(id);
        })
      );
      res.status(200).send({});
    } catch (err) {
      next(err);
    }
  });

//register shelter
//doesn't require authentication
router.route('/register').post(async (req, res, next) => {
  try {
    const shelter = await shelterService.createShelter(req.body);
    res.status(201).json({
      data: [shelter]
    });
  } catch (err) {
    next(err);
  }
});

//get pets by location
router.route('/near').get(async (req, res, next) => {
  //http://localhost:3001/shelters/near?lat=12.13&lon=12.345
  //console.log(req.query.lat);
  const lat = req.query.lat;
  const lon = req.query.lon;
  try {
    const aggregated = await shelterService.aggregateShelterWithPets(lon, lat);
    res.status(200).send({
      data: [aggregated]
    });
  } catch (err) {
    next(err);
  }
});

//login shelter
router.route('/login').post(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await shelterService.login(email, password);

    res.json({
      data: [token]
    });
  } catch (e) {
    // Refactor this
    console.log("ERROR",e)
    next(e);

  }
});

//get shelter info by specyfic shelter id
router
  .route('/:id')
  .get(async (req, res, next) => {
    const { id } = req.params;
    try {
      const shelter = await shelterService.getShelterById(id);
      res.status(200).send({
        data: [shelter]
      });
    } catch (err) {
      next(err);
    }
  })

//return all pets for specific shelter id
router.route('/:id/mypets').get(async (req, res, next) => {
  const { id } = req.params;
  try {
    //console.log(id);
    const shelter_with_pets_profiles = await shelterService.getShelterPets(id);
    //console.log(shelter_with_pets_profiles);

    res.status(200).send({
      data: shelter_with_pets_profiles
    });
  } catch (err) {
    next(err);
  }
});

exports.router = router;

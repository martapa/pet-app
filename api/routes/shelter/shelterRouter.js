const express = require('express');
const multer = require('multer');
const axios = require('axios');
const _ = require('lodash');

const shelterService = require('./shelterService');
const petService = require('../pet/petService');
const tokenService = require('../../utils/tokenService');
const requiresAuth = require('../../middleware/auth');
const Shelter = require('./shelterModel');
const awsService = require('../../utils/awsService');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
  })
  .post(requiresAuth, async (req, res, next) => {
    try {
      const id = req.token.shelter.id;

      const shelter = await shelterService.getShelterById(id);

      res.status(200).send({
        data: [shelter]
      });
    } catch (err) {
      next(err);
    }
  })
  .patch(requiresAuth, async (req, res, next) => {
    const id = req.token.shelter.id;

    try {
      const shelter = await shelterService.updateShelter(id, req.body);

      res.status(200).send({
        data: [shelter]
      });
    } catch (err) {
      next(err);
    }
  })
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

router
  .route('/register')
  .post(upload.single('file'), async (req, res, next) => {
    try {
      const shelter = await shelterService.createShelter(req.body, req.file);

      res.status(201).json({
        data: [shelter]
      });
    } catch (err) {
      next(err);
    }
  });

router.route('/near').get(async (req, res, next) => {
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

router.route('/login').post(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const token = await shelterService.login(email, password);

    res.json({
      data: [token]
    });
  } catch (e) {
    next(e);
  }
});

router.route('/mypets').get(requiresAuth, async (req, res, next) => {
  const id = req.token.shelter.id;

  try {
    const shelter_with_pets_profiles = await shelterService.getShelterPets(id);

    res.status(200).send({
      data: shelter_with_pets_profiles
    });
  } catch (err) {
    next(err);
  }
});

router
  .route('/editProfilePhoto')
  .patch(requiresAuth, upload.single('file'), async (req, res, next) => {
    const id = req.token.shelter.id;

    try {
      const awsImage = await awsService.resizeAndUpload(
        req.file.buffer,
        'shelters'
      );

      await Shelter.findOneAndUpdate(
        { _id: id },
        { avatar: awsImage },
        { new: true }
      );

      res.status(200).send({
        data: [awsImage]
      });
    } catch (err) {
      next(err);
    }
  });
router.route('/:id').get(async (req, res, next) => {
  const { id } = req.params;

  try {
    const shelter = await shelterService.getShelterById(id);

    res.status(200).send({
      data: [shelter]
    });
  } catch (err) {
    next(err);
  }
});

exports.router = router;

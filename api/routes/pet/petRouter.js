const express = require('express');
const multer = require('multer');
const awsService = require('../../utils/awsService');
const Shelter = require('../shelter/shelterModel');
const Pet = require('./petModel');


// const storage = multer.diskStorage({
//       destination: function (req, file, cb) {
//       cb(null, 'public')
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + '-' +file.originalname )
//     }
// })
// const upload = multer({ storage: storage }).single('file')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//initiate a router
const router = express.Router();
const petService = require('./petService');
const shelterService = require('../shelter/shelterService');
const requiresAuth = require('../../middleware/auth');

const _ = require('lodash');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const pets = await petService.getAllPets();
      res.status(200).send({
        data: [pets]
      });
    } catch (err) {
      next(err);
    }
  })
  .post(requiresAuth, upload.single('file'), async (req, res, next) => {
    const shelterId = req.token.shelter.id;
    try {
      const pet = await petService.createPet(req.body, shelterId, req.file);
      const shelterPets = await shelterService.getShelterPets(shelterId);

      res.status(201).json({
        data: [shelterPets]
      });
    } catch (err) {
      next(err);
    }
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    const { id } = req.params;
    try {
      const pet = await petService.getPetById(id);
      res.status(200).send({
        data: [pet]
      });
    } catch (err) {
      next(err);
    }
  })
  //delete pet by id and delete it's id from shelter profile
  .delete(requiresAuth, async (req, res, next) => {
    const { id } = req.params;
    const shelterId = req.token.shelter.id;

    try {
      const pet = await petService.deletePet(id);
      const shelter = await shelterService.getShelterById(shelterId);
      console.log(shelter);
      const pets_arr = await shelter.pets;
      const updated_pets = _.remove(pets_arr, item => {
        const item2 = String(item);
        return item2 !== String(id);
      });
      shelter.pets = updated_pets;
      const updated_shelter = await shelterService.updateShelter(
        shelterId,
        shelter
      );

      const remainingPets = await shelterService.getShelterPets(shelterId);

      res.status(200).send({
        data: [remainingPets]
      });
    } catch (err) {
      next(err);
    }
  })
  .patch(requiresAuth, async (req, res, next) => {
    const { id } = req.params;
    const shelterId = req.token.shelter.id;

    //console.log(req.body);
    try {
      const pet = await petService.updatePet(id, req.body, shelterId);
      //console.log(pet);
      res.status(200).send({
        data: [pet]
      });
    } catch (err) {
      next(err);
    }
  });

router
  .route('/editPetPhoto/:id')
  .patch(requiresAuth, upload.single('file'), async (req, res, next) => {
    const shelterId = req.token.shelter.id;
    const { id } = req.params;
    //console.log(req)
    try {
      const awsImage = await awsService.resizeAndUpload(
        req.file.buffer,
        'pets'
      );
      const shelter = await Shelter.findById(shelterId);

      if (shelter.pets.filter(pet => pet.toString() === id).length > 0) {
        const pet = await Pet.findOneAndUpdate(
          { _id: id },
          { photo: awsImage },
          { new: true }
        );

        res.status(200).send({
          data: [awsImage]
        });
      }
    } catch (err) {
      next(err);
    }
  });

exports.router = router;

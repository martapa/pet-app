const express = require('express');

//initiate a router
const router = express.Router();
const petService = require('./petService');
const shelterService = require('../shelter/shelterService');
const requiresAuth = require('../../middleware/auth');


const _ = require('lodash');

router.route('/')
  .get(async (req, res, next) => {
    try {
      const pets = await petService.getAllPets();
      res.status(200).send({
        data: [pets],
      });
    } catch(err) {
      next(err);
    }
  })
  .post(requiresAuth, async (req, res, next) => {
    const shelterId = req.token.shelter.id;
    try {
      const pet = await petService.createPet(req.body, shelterId);
      res.status(201).json({
        data: [pet],
      });
    } catch(err){
      next(err);
    }
  })


  router.route('/:id')
  .get(async (req, res, next) => {
    const { id } = req.params;
    try {
      const pet = await petService.getPetById(id);
      res.status(200).send({
        data: [pet],
      });
    } catch (err) {
      next(err);
    }
  })
  //delete pet by id and delete it's id from shelter profile
  .delete(requiresAuth, async (req, res, next) => {
    const { id } = req.params;
    const shelterId = req.token.shelter.id;
    console.log(shelterId);

    try {
      const pet = await petService.deletePet(id);
      const shelter = await shelterService.getShelterById(shelterId);
      console.log(shelter)
      const pets_arr = await shelter.pets;
      const updated_pets = _.remove(pets_arr, item => {
        const item2 = String(item);
        return item2 !== String(id);
      });
      shelter.pets = updated_pets
      const updated_shelter = await shelterService.updateShelter(shelterId, shelter);


      const remainingPets = await petService.getAllPets();
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

    console.log(req.body);
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


exports.router = router;

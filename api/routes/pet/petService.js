const Pet = require('./petModel');
const Shelter = require('../shelter/shelterModel');
const mongoose = require('mongoose');
const { HTTP404Error, HTTP403Error, HTTP400Error } = require('../../utils/httpErrors');
const _ = require('lodash');


exports.getAllPets = async () => {
  try {
    return await Pet.find();
  } catch (err) {
    throw err;
  }
};
exports.createPet = async (petData, shelterId) => {
  const pet = new Pet(petData);
  const is_adopted_arr = ["For adoption", "Already adopted"]
  const size_arr = ['extra-small','small', 'medium', 'large', 'extra-large']
  const good_with_arr = ['dogs', 'cats', 'children'];
  //console.log(pet.good_with)
  //console.log(good_with_arr);
  const filtered = pet.good_with.every( e => good_with_arr.includes(e) )

  if (!filtered) throw new HTTP400Error('Invalid dog informationnnn');

  if (!is_adopted_arr.includes(pet.is_adopted[0])) throw new HTTP400Error('Invalid dog information');

  if (!size_arr.includes(pet.size[0])) throw new HTTP400Error('Invalid dog information');

  if (!Number.isInteger(pet.age)) throw new HTTP400Error('Invalid dog age');



  try {
    const doc = await pet.save();
    console.log(doc)

    const shelter = await Shelter.findByIdAndUpdate(
      shelterId,
      { $push: { pets: doc._id } },
      { new: true }
    );
    return doc;
  } catch (err) {
    throw err;
  }
};

exports.getPetById = async id => {
  console.log(id);
  const ObjectId = mongoose.Types.ObjectId;

  try {
    //return await Pet.findById(id);
    //console.log(id);
    const p = await Pet.aggregate([
      { $match: {_id: ObjectId(id)} },
      {
        $lookup: {
          from: 'shelters',
          let: { id: '$_id' },
          pipeline: [
            { $match: { $expr: { $in: ['$$id', '$pets'] } } },
            { $unwind: '$pets' },
            { $match: { $expr: { $eq: ['$pets', '$$id'] } } },
          ],
          as: 'shelter_info'
        }
      }
    ]);
    return p;
    // const sp = await Pet.aggregate([
    //   { $match: { _id: ObjectId(id) } },
    //   {
    //     $lookup: {
    //       from: 'shelters',
    //       let: { id: '$_id' },
    //       pipeline: [
    //         { $match: { $expr: { $in: [ObjectId(id), '$pets'] } } },
    //         { $unwind: '$pets' },
    //         { $match: { $expr: { $eq: ['$pets', '$$id'] } } },
    //
    //       ],
    //       as: 'shelter_info'
    //     }
    //   }
    // ]);
    //console.log(sp);
    return p;
  } catch (err) {
    throw err;
  }
};

exports.deletePet = async id => {
  try {
    return await Pet.findByIdAndRemove(id);
  } catch (err) {
    throw err;
  }
};

exports.updatePet = async (petId, updated, shelterId) => {
  try {
    const shelter = await Shelter.findById(shelterId);
    if (shelter.pets.filter(pet => pet.toString() === petId).length > 0) {
      const pet = await Pet.findOneAndUpdate({ _id: petId }, updated, {
        new: true
      });
      return pet;
    }
  } catch (err) {
    throw err;
  }
};

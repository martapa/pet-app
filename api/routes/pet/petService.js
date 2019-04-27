
const Pet = require('./petModel');
const Shelter = require('../shelter/shelterModel');



exports.getAllPets = async () => {
  try{
    return await Pet.find();
  } catch(err){
  throw(err);
  }
}
exports.createPet = async (petData, shelterId) => {
  const pet = new Pet(petData);
  try {

    const doc = await pet.save();

    const shelter = await Shelter.findByIdAndUpdate(
          shelterId,
          { $push: { pets: doc._id } },
          { new: true }
        );
    return doc;

  } catch(err){
    throw err;
  }
}

exports.getPetById = async (id) => {
  try{
    return await Pet.findById(id);
  }
  catch (err){
    throw err;
  }
};

exports.deletePet = async (id) => {
  try {
    return await Pet.findByIdAndRemove(id);
  } catch (err){
    throw err;
  }
}

exports.updatePet = async (petId, updated, shelterId) => {
  try {
    const shelter = await Shelter.findById(shelterId);
      if (
        shelter.pets.filter(pet => pet.toString() === petId).length > 0
      ){
        const pet = await Pet.findOneAndUpdate({_id: petId}, updated, {new: true});
        return pet;

      }
  } catch (err){
    throw err;
  }
}

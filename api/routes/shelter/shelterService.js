const Shelter = require('./shelterModel');
const mongoose = require('mongoose');
const tokenService = require('../../utils/tokenService');
const { HTTP404Error, HTTP403Error, HTTP400Error } = require('../../utils/httpErrors');

exports.getAllShelters = async () => {
  try {
    return await Shelter.find();
  } catch (err) {
    throw err;
  }
};

exports.createShelter = async shelterData => {
  try {
    const shelter = new Shelter(shelterData);
    return await shelter.save();
  } catch (err) {
    throw err;
  }
};

exports.getShelterById = async id => {
  try {
    return await Shelter.findById(id);
  } catch (err) {
    throw err;
  }
};



// check if this works
exports.updateShelter = async (id, updated) => {
  try {
    const shelter = await Shelter.findOneAndUpdate({_id: id}, updated, { new: true });
    return shelter;
  } catch (err) {
    throw err;
  }
};

exports.deleteShelter = async id => {
  try {
    return await Shelter.findByIdAndRemove(id);
  } catch (err) {
    throw err;
  }
};

// exports.filterByPetId = async id => {
//   try {
//     const shelter = await Shelter.find({ pets: { $in: [id] } });
//     return shelter;
//   } catch (err) {
//     throw err;
//   }
// };

exports.aggregateShelterWithPets = async (longitude, latitude) => {
  try {
    //console.log(longitude);
    const ag = await Shelter.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          distanceField: 'distance', // co to
          maxDistance: 20000,
          includeLocs: 'location',
          spherical: true
        }
      },
      {
        $lookup: {
          from: 'pets',
          localField: 'pets',
          foreignField: '_id',
          as: 'pets_profiles'
        }
      },
      { $sort: { distance: -1 } }
    ]);

    return ag;
  } catch (err) {
    throw err;
  }
};

exports.getShelterPets = async id => {
  const ObjectId = mongoose.Types.ObjectId;
  try {
    console.log(id);
    const sp = await Shelter.aggregate([
      {
        $match: {
          _id: ObjectId(id)
        }
      },
      {
        $lookup: {
          from: 'pets',
          localField: 'pets',
          foreignField: '_id',
          as: 'pets_profiles'
        }
      }
    ]);
    return sp;
  } catch (err) {
    throw err;
  }
};

exports.login = async (email, password) => {
  try {
    if (!email) throw new HTTP400Error('Email Missing');
    else if (!password) throw new HTTP400Error('Password Missing');

    const user = await Shelter.findOne({ email });

    if (!user) throw new HTTP404Error('User Does Not Exist');

    const match = await user.comparePassword(password);

    if (!match) throw new HTTP403Error('Password Incorrect');

    const token = tokenService.create(user);

    return token;
  } catch (e) {
      throw e
  }
};

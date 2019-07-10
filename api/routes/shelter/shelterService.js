const Shelter = require('./shelterModel');
const mongoose = require('mongoose');
const validator = require('validator');

const tokenService = require('../../utils/tokenService');
const {
  HTTP404Error,
  HTTP403Error,
  HTTP400Error
} = require('../../utils/httpErrors');
const awsService = require('../../utils/awsService');

exports.getAllShelters = async () => {
  try {
    return await Shelter.find();
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

exports.updateShelter = async (id, updated) => {
  const {
    email,
    password,
    shelter_name,
    description,
    address,
    phone,
    location
  } = updated;

  try {
    if (!email || !password || !shelter_name || !description || !address)
      throw new HTTP400Error('Something is missing');

    if (!validator.isEmail(email)) throw new HTTP400Error('Invalid email');

    if (phone && !validator.isMobilePhone(phone))
      throw new HTTP400Error('Invalid phone number');

    if (location.type !== 'Point')
      throw new HTTP400Error('Invalid location type');

    if (location.coordinates[0] < -180 || location.coordinates[0] > 180)
      throw new HTTP400Error('Invalid coordinates');

    if (location.coordinates[1] > 90 || location.coordinates[1] < 0)
      throw new HTTP400Error('Invalid coordinates');

    const shelter = await Shelter.findOneAndUpdate({ _id: id }, updated, {
      new: true
    });

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

exports.aggregateShelterWithPets = async (longitude, latitude) => {
  try {
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
exports.createShelter = async (shelterData, buffer) => {
  const {
    email,
    password,
    shelter_name,
    description,
    address,
    phone
  } = shelterData;

  const coordinates = shelterData.location.split(',');
  shelterData['location'] = {
    type: 'Point',
    coordinates: coordinates.map(Number)
  };

  try {
    const users_email = await Shelter.findOne({ email });

    if (!email || !password || !shelter_name || !description || !address)
      throw new HTTP400Error('Something is missing');

    if (!validator.isEmail(email)) throw new HTTP400Error('Invalid email');

    if (email === users_email) throw new HTTP400Error('User already exists');

    if (phone && !validator.isMobilePhone(phone))
      throw new HTTP400Error('Invalid phone number');

    if (shelterData.location.type !== 'Point')
      throw new HTTP400Error('Invalid location type');

    if (
      shelterData.location.coordinates[0] < -180 ||
      shelterData.location.coordinates[0] > 180
    )
      throw new HTTP400Error('Invalid coordinates');

    if (
      shelterData.location.coordinates[1] > 90 ||
      shelterData.location.coordinates[1] < 0
    )
      throw new HTTP400Error('Invalid coordinates');

    const user = await Shelter.findOne({ email });

    if (user) throw new HTTP404Error('User Already Exists');

    const shelter = new Shelter(shelterData);

    if (buffer) {
      const awsImage = await awsService.resizeAndUpload(
        buffer.buffer,
        shelter._id,
        'shelters'
      );

      shelter.avatar = awsImage;

      const doc = await shelter.save();

      return doc;
    }
  } catch (err) {
    if (err.name === 'MongoError' && process.env.NODE_ENV === 'production')
      throw new HTTP400Error();
    throw err;
  }
};

exports.login = async (email, password) => {
  try {
    if (!email) throw new HTTP400Error('Email Missing');
    else if (!password) throw new HTTP400Error('Password Missing');

    const user = await Shelter.findOne({ email });

    if (!user) throw new HTTP404Error('User Or Password Incorrect');

    const match = await user.comparePassword(password);

    if (!match) throw new HTTP403Error('User Or Password Incorrect');

    const token = tokenService.generateToken(user);

    return token;
  } catch (e) {
    throw e;
  }
};

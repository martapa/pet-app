// const mongoose = require('mongoose');

const shelterModel = require('../routes/shelter/shelterModel');
const petModel = require('../routes/pet/petModel');

exports.seed = async () => {
  await shelterModel.remove();
  await petModel.remove();

  const petsData = [
    {
      name: 'Bobek',
      size: 'extra-large',
      age: 20,
      is_adopted: false,
      good_with: 'children'
    },
    {
      name: 'Klusek',
      size: 'large',
      age: 2,
      is_adopted: false,
      good_with: ['children', 'dogs', 'cats']
    },
    {
      name: 'Sam',
      size: 'extra-small',
      age: 8,
      is_adopted: false,
      good_with: ['children', 'cats']
    },
    {
      name: 'Kelly',
      size: 'medium',
      age: 10,
      is_adopted: false,
      good_with: ['children', 'dogs', 'cats']
    },
    {
      name: 'Amanda',
      size: 'small',
      age: 5,
      is_adopted: false,
      good_with: []
    },
    {
      name: 'Kasia',
      size: 'medium',
      age: 3,
      is_adopted: false,
      good_with: 'children'
    },
    {
      name: 'Karol',
      size: 'large',
      age: 4,
      is_adopted: false,
      good_with: ['cats', 'dogs']
    },
    {
      name: 'Marta',
      size: 'medium',
      age: 2,
      is_adopted: false,
      good_with: ['cats', 'dogs']
    },
  ];

  const petPromises = petsData.map(async petData => {
    const pet = new petModel(petData);
    const petDoc = await pet.save();
    return petDoc;
  });

  const pets = await Promise.all(petPromises); // FOR REASONS;

  const sheltersData = [
    {
      shelter_name: 'Test Shelter',
      email: 'test_shelter@gmail.com',
      password: 'password',
      description: 'This is a test shelter.',
      location: {
        type: 'Point',
        coordinates: [-79.381706, 43.651890]
      },
      pets: [pets[2], pets[3]]
    },

    {
      shelter_name: 'Second Shelter',
      email: 'second_shelter@gmail.com',
      password: 'second_password',
      description: 'This is a test shelter.',
      location: {
        type: 'Point',
        coordinates: [-79.356343, 43.657630]
      },
      pets: [pets[0], pets[1]]
    },

    {
      shelter_name: 'Great Shelter',
      email: 'great_shelter@gmail.com',
      password: 'great_password',
      description: 'This is a test shelter.',
      location: {
        type: 'Point',
        coordinates: [-79.367967, 43.661860]
      },
      pets: [pets[4], pets[5]]
    },
    {
      shelter_name: 'SPCA of Montreal QC',
      email: 'spca@gmail.com',
      password: 'great_password',
      description: 'This is a spca of Montreal shelter.',
      location: {
        type: 'Point',
        coordinates: [-73.651817, 45.495801]
      },
      pets: [pets[6], pets[7]]
    },
  ];

  const shelterPromises = sheltersData.map(async shelterData => {
    const shelter = new shelterModel(shelterData);
    const shelterDoc = await shelter.save();
    return shelterDoc;
  });

  const shelters = await Promise.all(shelterPromises); // FOR REASONS;
}

exports.truncate = async () => {
  await shelterModel.deleteMany();
  await petModel.deleteMany();
};
// const url = 'mongodb://localhost:27017/pets_project';
// mongoose
//   .connect(url, {
//     useNewUrlParser: true
//   })
//   .then(async () => {
//     console.log(`Connect to server: ${url}`);
//     await seed();
//   })
//   .catch(err => {
//     console.log(err);
//     throw err;
//   });

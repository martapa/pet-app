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
      is_adopted: "For adoption",
      good_with: 'children',
      description:"Bobek is a great walker and really likes to smell and explore on walks, can be managed through basic training and feeding separately.",
      photo: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1560&q=80"
    },
    {
      name: 'Klusek',
      size: 'large',
      age: 2,
      is_adopted: "For adoption",
      good_with: ['children', 'dogs', 'cats'],
      description: "Klusek was abandoned at the animal hospital; the owner left him there for checkup but never came back to pick him up.",
      photo: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1533&q=80"
    },
    {
      name: 'Sam',
      size: 'extra-small',
      age: 8,
      is_adopted: 'Already adopted',
      good_with: ['children', 'cats'],
      description:"Sam went through a lot. He needs very patient parents.",
      photo:"https://images.unsplash.com/photo-1505044197374-4d4ae3f9d566?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80"
    },
    {
      name: 'Kelly',
      size: 'medium',
      age: 10,
      is_adopted: 'For adoption',
      good_with: ['children', 'dogs', 'cats'],
      description:"Kelly was rescued from Dangjin dog meat farm last fall in Korea. As you can see in the first photo, she was tied to a concrete block in hot summer; there was no water or food. Kelly likes to be around people; obedient, friendly and affectionate.",
      photo:"https://images.unsplash.com/photo-1550165298-e574b8c3c7f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1587&q=80"
    },
    {
      name: 'Amanda',
      size: 'small',
      age: 5,
      is_adopted: 'Already adopted',
      good_with: [],
      description: "Amanda is a nice dog. She likes long walks and naps. Her owner died so she is lonely now.",
      photo: "https://images.unsplash.com/photo-1548946621-7426005b8ee2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1532&q=80"
    },
    {
      name: 'Kasia',
      size: 'medium',
      age: 3,
      is_adopted: 'Already adopted',
      good_with: 'children',
      description:"Kasia is full of joy. She likes to eat veggies and fruits. Her favourie one is an apple.",
      photo: "https://images.unsplash.com/photo-1530126483408-aa533e55bdb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1601&q=80"
    },
    {
      name: 'Karol',
      size: 'large',
      age: 4,
      is_adopted: 'For adoption',
      good_with: ['cats', 'dogs'],
      description: "Karol still has a lot to learn, but with a little bit of training and support, he will become a great companion dog. He has a good personality and temperament.",
      photo: "https://images.unsplash.com/photo-1542220365-4807048114ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80"
    },
    {
      name: 'Marta',
      size: 'medium',
      age: 2,
      is_adopted: 'For adoption',
      good_with: ['cats', 'dogs'],
      description:"Marta is a real lady. She likes to lie on the couch all day and smell nice.",
      photo:"https://images.unsplash.com/photo-1555231458-22288111e347?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80"
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
      pets: [pets[2], pets[3]],
      address: "72 Queen Street West, Toronto, ON M5H 3R3, Canada"
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
      pets: [pets[0], pets[1]],
      address: "11 River Street, Toronto, ON M5A 4C2, Canada"
    },

    {
      shelter_name: 'Great Shelter',
      email: 'great_shelter@gmail.com',
      password: 'great_password',
      description: 'This is a test shelter.',
      avatar:'https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
      location: {
        type: 'Point',
        coordinates: [-79.367967, 43.661860]
      },
      pets: [pets[4], pets[5]],
      address: "167 Parliament Street, Toronto, ON M5A 2Z2, Canada"
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
      pets: [pets[6], pets[7]],
      address: "5215 Rue Jean-Talon Ouest, Montreal, QC H4P 1X4, Canada"
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

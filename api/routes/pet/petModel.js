const mongoose = require('mongoose');
const { Schema } = mongoose;

const petSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  size:
    [{
      type: String,
      enum: ['', 'extra-small','small', 'medium', 'large', 'extra-large']
    }]
  ,
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String
  },
  photo: {
    type: String
  },
  description: {
    type: String,
    max: 1000
  },
  is_adopted:
    [{
      type: String,
      enum: ['For adoption','Already adopted']
    }]
  ,
  good_with: [{
    type: String,
    enum: ['', 'dogs', 'cats', 'children']
  }],
});

module.exports = mongoose.model('pets', petSchema);

const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const shelterSchema = new Schema({
  shelter_name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  description: {
    type: String,
    required: true,
    max: 1000
  },
  phone: {
    type: String
  },
  volunteer_name: {
    type: String
  },
  pets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'pets'
    }
  ],
  location: {
    type: { type: String },
    coordinates: []
  },
  address: {
    type: String
  }
});

shelterSchema.index({ location: '2dsphere' });

shelterSchema.pre('save', async function(next) {
  const shelter = this;

  if (shelter.isModified('password') || shelter.isNew) {
    try {
      const hash = await bcrypt.hash(shelter.password, 10);

      shelter.password = hash;

      return next();
    } catch (e) {
      return next(e);
    }
  } else {
    return next();
  }
});

shelterSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('shelters', shelterSchema);

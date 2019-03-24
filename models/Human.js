import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const humanSchema = new Schema({
  socialID: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  hairColor: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  url: {
    type: String,
    required: true
  }
});

const Human = mongoose.model("Human", humanSchema);

export default Human;
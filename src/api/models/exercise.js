const mongoose = require('mongoose')

const ExerciseSchema = new mongoose.Schema({
  name: {
    type: Object,
    trim: true,
    required: true,
  },
  image: {
    type: String,
    trim: true,
    required: true,
  },
  image_alt: {
    type: String,
    trim: true,
    required: true,
  },
  sound: {
    type: String,
    trim: true,
    required: true,
  },
  duration: {
    type: Number,
    trim: true,
    required: true,
  },
  order: {
    type: Number,
    trim: true,
    required: true,
  },
})

module.exports = mongoose.model('Exercise', ExerciseSchema)

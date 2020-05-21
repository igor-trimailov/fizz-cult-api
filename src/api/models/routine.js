const mongoose = require('mongoose')

const RoutineSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  created_on: {
    type: Date,
    required: false,
  },
  edited_on: {
    type: Date,
    required: false,
  },
  exercises: {
    type: mongoose.Schema.Types.Array,
    required: false
  }
})

module.exports = mongoose.model('Routine', RoutineSchema)

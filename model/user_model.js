const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const schema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 1,
  },
  lastName: {
    type: String,
    required: true,
    min: 1,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
})

schema.plugin(timestamp)

module.exports = mongoose.model('User', schema)

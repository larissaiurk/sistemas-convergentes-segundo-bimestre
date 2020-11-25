const mongoose = require('mongoose')

const Images = mongoose.model('Image', new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
}))

module.exports = Images
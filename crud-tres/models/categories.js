const mongoose = require('mongoose')

const Categories = mongoose.model('Category', new mongoose.Schema({
  code: {type: Number, required: true, unique: true},
  name: {type: String, required: true},
}))

module.exports = Categories
const mongoose = require('mongoose')

const Products = mongoose.model('Product', new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  description: {type: String, required: true},
  price: {type: Number, required: true},
  categoryId: {type: String, required: false},
}))

module.exports = Products
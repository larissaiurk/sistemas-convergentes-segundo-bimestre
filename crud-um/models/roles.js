const mongoose = require('mongoose')

const Roles = mongoose.model('Role', new mongoose.Schema({
  name: {type: String, required: true, unique: true},
}))

module.exports = Roles
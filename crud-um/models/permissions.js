const mongoose = require('mongoose')

const Permissions = mongoose.model('Permission', new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  roleId: {type: String, required: true},
}))

module.exports = Permissions
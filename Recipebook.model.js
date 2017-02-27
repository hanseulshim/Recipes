var mongoose = require('mongoose')
var Schema = mongoose.Schema

var RecipebookSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  ingredients: {
    type: Array
  }
})

module.exports = mongoose.model('recipes', RecipebookSchema)
